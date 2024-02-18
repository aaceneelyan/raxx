/* eslint-disable max-len */

// TODO: migrate this file to be a blueprint itself similarly done with OrderCart/V1

import { rebillyProcessOrder } from './rebilly_element'
import { defaultDomains, defaultSecondLevelDomains, defaultTopLevelDomains } from './vendor/mailCheck/domains'
import { Mailcheck } from './vendor/mailCheck/main'
import $ from 'jquery'

globalThis.processForm = function () {
  return { ...getPurchaseForm(), ...getContactForm() }
}

export type FormPurchaseProductType = {
  id: string
  price_id?: number
  quantity: number
}

export type FormPurchaseType = {
  purchase: {
    product_variants: FormPurchaseProductType[]
    coupon_codes: string[]
    rebilly_token?: string
  }
}

export function restoreButtonState(): void {
  $('.elBTN a[href="#submit-form"]').each(function () {
    const $this = $(this)
    const $text = $this.find('.elButtonMainText')
    const $subText = $this.find('.elButtonSub')
    const previousText = $this.attr('data-before-submit-text')
    const previousSub = $this.attr('data-before-submit-sub')
    const loadingSpinner = $text.parent().find('.elButtonSpinner')
    loadingSpinner.css('display', 'none')
    if (previousText) {
      $this.removeClass('cf-submitting-page')
      $text.text(previousText)
      $subText.text(previousSub)
      $this.removeAttr('data-before-submit-text')
      $this.removeAttr('data-before-submit-sub')
    }
  })
}

function setButtonSubmitText(text?: string, subtext?: string): void {
  $('.elBTN a[href="#submit-form"]').each(function () {
    const $this = $(this)
    const $text = $this.find('.elButtonMainText')
    const $subText = $this.find('.elButtonSub')
    const $parent = $this.parent()
    const submitText =
      text ??
      ($parent.attr('data-param-submittingtext')?.length ? $parent.attr('data-param-submittingtext') : 'Submitting...')
    const dataBeforeSubmit = $this.attr('data-before-submit-text')
    if (!dataBeforeSubmit) {
      $this.attr('data-before-submit-text', $text.text())
      $this.attr('data-before-submit-sub', $subText.text())
      $this.addClass('cf-submitting-page')
    }
    const loadingSpinner = $this.find('.elButtonSpinner')
    $text.text(`${submitText}`)
    $subText.text(subtext ?? '')
    loadingSpinner.css('display', 'inline-block')
  })
}

async function sleepMs(timeMs: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, timeMs)
  })
}

async function submitOrderAsync(
  body: string,
  maxRetries = 3,
  onBeforeSubmit: () => void,
  onRetryAfter: (sleepTime: number) => void
): Promise<Response> {
  let response: Response
  for (let i = 0; i < maxRetries; i++) {
    try {
      onBeforeSubmit()
      response = await fetch(window.location.href, {
        credentials: 'same-origin',
        method: 'post',
        body,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CF2-POST-TYPE': 'submit',
        },
      })
      if (response.status === 429) {
        const sleepTime = parseInt(response.headers.get('Retry-After'))
        onRetryAfter(sleepTime)
        console.log(`Waiting on queue, retrying after ${sleepTime}`)
        await sleepMs(sleepTime)
      } else {
        break
      }
    } catch (err) {
      console.log(err)
      await sleepMs(5000)
    }
  }
  return response
}

export function submitPage(): void {
  const data = globalThis.processForm()
  $('#cfAR .purchaseInput').remove()

  // TODO: it would be nice to post this in JSON instead of using #cfAR submit
  // problem here is that on redirect, rails returns the page to redirect to, and
  // not the URL of the page in that case.
  data.purchase?.product_variants?.forEach((pv) => {
    $('#cfAR').append(
      `<input type="text" class="purchaseInput" name="purchase[product_variants][][id]" value="${pv.id}" />`
    )
    $('#cfAR').append(
      `<input type="number" class="purchaseInput" \
name="purchase[product_variants][][quantity]" value="${pv.quantity}"/>`
    )
    $('#cfAR').append(
      `<input type="number" class="purchaseInput" name="purchase[product_variants][][price_id]" value="${pv.price_id}" />`
    )
  })
  data.purchase?.coupon_codes?.forEach((couponCode: string) => {
    $('#cfAR').append(
      `<input type="text" class="purchaseInput" name="purchase[coupon_codes][]" value="${couponCode}" />`
    )
  })

  $('#cfAR').append('<input type="text" class="purchaseInput" name="purchase[process_new_order]" value="true" />')

  clearBlankInputFields()
  const formData = $('#cfAR').serialize()
  let timer: NodeJS.Timer = null
  globalThis.CFDispatchEvent(CFEvents.FORM_SUBMITTED, data)

  submitOrderAsync(
    formData,
    3,
    () => {
      clearInterval(timer)
      setButtonSubmitText()
    },
    (sleepTime) => {
      let remainingSeconds = sleepTime / 1000
      clearInterval(timer)
      timer = setInterval(() => {
        remainingSeconds -= 1
        setButtonSubmitText('Waiting on queue', `(Retrying in ${remainingSeconds}s)`)
      }, 1000)
    }
  )
    .then((response) => {
      if (response.ok) {
        globalThis.CFDispatchEvent(CFEvents.FORM_SUBMITTED_OK, data)
        const rawFlashes = response.headers.get('X-CF2-FLASHES')
        const flashes = JSON.parse(rawFlashes ?? '{}')
        if (flashes.error) {
          clearInterval(timer)
          window.dispatchEvent(
            new CustomEvent('checkout:order-submit-errors', {
              detail: {
                error: `Failed to submit: ${flashes.error}`,
              },
            })
          )
          restoreButtonState()
        } else if (response.headers.get('X-CF2-APPROVAL-URL')) {
          const approvalUrl = response.headers.get('X-CF2-APPROVAL-URL')
          const auxWrapper = document.querySelector('.multiple-payment-aux-frame')
          const $auxWrapper = $(auxWrapper)
          const iframe = document.createElement('iframe')
          const orderStautsIframe = '/cf_order_status?disable-dispatch=true'
          iframe.onload = () => {
            if (iframe.src.includes(orderStautsIframe)) {
              $auxWrapper.css('display', 'flex')
              iframe.src = approvalUrl
            }
          }
          auxWrapper.innerHTML = ''
          auxWrapper.appendChild(iframe)
          iframe.src = orderStautsIframe
        } else {
          globalThis.CFDispatchEvent(CFEvents.FORM_SUBMITTED_FINALIZED, data)
          window.location.href = response.headers.get('Location')
        }
      } else if (response.status === 429) {
        clearInterval(timer)
        setButtonSubmitText('Failed to submit', 'Retry again in a few seconds')
        sleepMs(5000).then(() => {
          window.dispatchEvent(new CustomEvent('payments:submit-failed'))
          restoreButtonState()
        })
      } else if (response.status >= 300 && response.status < 400) {
        window.location.href = response.headers.get('Location') ?? window.location.href
      } else {
        window.dispatchEvent(new CustomEvent('checkout:order-submit-errors'))
      }
    })
    .catch((err) => {
      console.log(err)
      clearInterval(timer)
      window.dispatchEvent(new CustomEvent('payments:submit-failed'))
      restoreButtonState()
    })
}
globalThis.submitPage = submitPage

function clearBlankInputFields(): void {
  $('#cfAR')
    .find('input,select,textarea')
    .each((index: number, input: HTMLInputElement) => {
      if (input.value == '') {
        input.remove()
      }
    })
}

function getPurchaseForm(): FormPurchaseType | Record<string, never> {
  const orderCart = window['OrderCart/V1']?.default
  if (!orderCart) return {}
  const products = orderCart?.productVariants
  const formPurchaseProductVariants = products?.map((product) => {
    return {
      id: product.id,
      price_id: product.priceId,
      quantity: product.quantity,
    }
  })
  const rebillyToken = $('#cfAR input[data-rebilly="token"]').val()

  return {
    purchase: {
      product_variants: formPurchaseProductVariants,
      rebilly_token: rebillyToken as string,
      coupon_codes: [orderCart?.couponCode].filter(Boolean),
    },
  }
}

// NOTE: This method changes #cfAR according to page content input elements,
// and it also returns an object with all contact attributes (based on legacy code)
function getContactForm() {
  const data = { contact: {} }
  $('.elFormItem:not([data-prevent-submit="true"])').each(function () {
    const $this = $(this)
    let name = $this.attr('name')
    if (name == '' || name == 'not-set') return

    // TODO: This ia n FHL workaround for submitting country and state as
    // shipping country and state.
    if (['country', 'state'].includes(name)) {
      name = 'shipping_' + name
    }

    let value = $this.val()

    if (name == 'phone_number' && this.iti) {
      value = this.iti.getNumber()
    }

    if (this.getAttribute('type') == 'checkbox') {
      value = $this.is(':checked')
      data.contact[name] = value
    } else if (value) {
      data.contact[name] = value
    }

    const $contactInput = $('#cf_contact_' + name)
    // custom type
    if ($contactInput.length == 0 && name) {
      let customType = name.toLowerCase()

      // If you type 'Make of Vehicle' in custom field name,
      //it was passed as 'make_of vehicle' param and we're failing.
      // Yep, we're explicit that "Custom Type accepts letters and numbers only.",
      // but customers do not care, so it's easier just to fix that.
      customType = customType.replace(/\s+/g, '_')
      $('#cf_contact_' + customType).remove()

      const input = <HTMLInputElement>document.createElement('INPUT')
      input.id = 'cf_contact_' + customType
      input.name = customType
      input.setAttribute('value', value as string)
      input.setAttribute('data-cf-form-field', customType)
      input.setAttribute('data-param', customType)
      input.setAttribute('data-storage', 'false')
      $('#cfAR').append(input)
    } else {
      if ($this.attr('data-prevent-submit') == 'true') {
        $contactInput.val('')
      } else {
        $contactInput.val(value) //.attr('name', name);
      }
    }
  })
  return data
}

function validateEmail(email) {
  email = $.trim(email)
  const re = /^(([^<>()[\]\\.,;:#`%\s@"]+(\.[^<>()[\]\\.,;:#`%\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return re.test(email)
}

export function checkValidInputs(): boolean {
  const popupVisibleCheck = $('.modal-wrapper').is(':visible')
  let fail = false
  let elementPathSelector
  if (popupVisibleCheck == true) {
    // check only in the pop up
    elementPathSelector = '#modalPopup .elFormItem.required1'
  } else {
    // check all that are visible (on page)
    elementPathSelector = '.pageRoot .elFormItem.required1'
  }
  $(elementPathSelector).each(function () {
    let thisInput = $(this)
    const visible = $(this).is(':visible')

    if (visible) {
      let value = thisInput.val()
      const isSelect = thisInput.is('select')
      if (isSelect) {
        value = thisInput.find(':selected').attr('value')
      }
      const parent = thisInput.parents('.elFormItemWrapper')
      thisInput =
        parent.length && parent.find('.inputHolder, .borderHolder, .elCheckbox').length
          ? parent.find('.inputHolder, .borderHolder, .elCheckbox')
          : thisInput
      if (
        thisInput.is(':checkbox')
          ? !thisInput.is(':checked')
          : value === null || typeof value === 'undefined' || value === ''
      ) {
        fail = true
        thisInput.css('border-color', '#B91517')
        thisInput.css('border-width', '3px')
      } else {
        if (thisInput.attr('name') == 'email') {
          if (validateEmail(value)) {
            thisInput.css('border-color', '#4a8920')
            thisInput.css('border-width', '3px')
          } else {
            fail = true
            thisInput.css('border-color', '#B91517')
            thisInput.css('border-width', '3px')
          }
        } else {
          thisInput.css('border-color', '#4a8920')
          thisInput.css('border-width', '3px')
        }
      }
    }
  })
  return fail == false
}

function mailCheck() {
  const inputsSelector = Array.from(document.getElementsByName('email'))

  inputsSelector.forEach((input, index) => {
    const mailCheckNode = document.createElement('div')
    mailCheckNode.classList.add('mailcheck')
    mailCheckNode.classList.add(`index${index}`)
    input.parentElement.appendChild(mailCheckNode)
    input.addEventListener('blur', function (this: HTMLInputElement) {
      Mailcheck.run({
        email: this.value,
        domains: defaultDomains,
        secondLevelDomains: defaultSecondLevelDomains, // optional
        topLevelDomains: defaultTopLevelDomains, // optional
        suggested: function (suggestion) {
          mailCheckNode.innerHTML = `<span>Did you mean <b>${suggestion.full}?</b></span>`
        },
        empty: function () {
          mailCheckNode.innerHTML = ''
        },
      })
    })
  })
}

function handleEnterSubmit() {
  const popupVisibleCheck = $('.modal-wrapper').is(':visible')
  let buttonsPathSelector: string

  if (popupVisibleCheck == true) {
    buttonsPathSelector = '#modalPopup .elBTN a[href="#submit-form"]:visible'
  } else {
    buttonsPathSelector = '.pageRoot .elBTN a[href="#submit-form"]:visible'
  }
  const submitButton = $(buttonsPathSelector).first()
  handleFormSubmit(submitButton)
}

function setupEnterKeySubmit() {
  const inputsPathSelector = '.elFormItem'

  $(inputsPathSelector).each(function () {
    const thisInput = $(this)
    if (thisInput.closest('[data-page-element="Checkout/V1"]').length > 0) {
      return true
    }
    if (thisInput.closest('[data-page-element="Checkout/V2"]').length > 0) {
      return true
    }
    thisInput.on('keypress', function (evt) {
      if (evt.key === 'Enter') {
        handleEnterSubmit()
      }
    })
  })
}

function setRedirectOverride($button) {
  let redirectOverride
  if ($button.parents('.elBTN').length) {
    redirectOverride = $button.attr('data-on-submit-go-to')
  }

  if (redirectOverride) {
    $('#cfAR').append(`<input type="text" class="redirectParams" name="redirect_to" value="${redirectOverride}" />`)
  } else {
    $('#cfAR .redirectParams').remove()
  }
}

function handleFormSubmit($button) {
  setRedirectOverride($button)
  setButtonSubmitText()

  if ($('.pai-payment-methods-inner:visible').length > 0) {
    const $rebillySubmit = $('.pai-submit')
    const $rebillyForm = $('.elPAI')
    if ($rebillySubmit.length) {
      $rebillySubmit.trigger('click')
      return
    } else if ($rebillyForm.length) {
      rebillyProcessOrder()
      return
    } else if (!checkValidInputs()) {
      restoreButtonState()
      return
    }
  }

  if (checkValidInputs()) {
    submitPage()
  } else {
    restoreButtonState()
  }
  return true
}
globalThis.handleFormSubmit = handleFormSubmit
globalThis.setButtonSubmitText = setButtonSubmitText
globalThis.restoreButtonState = restoreButtonState
globalThis.setRedirectOverride = setRedirectOverride

window.addEventListener('load', function () {
  mailCheck()
  setupEnterKeySubmit()
  $(document).on('click', '[href="#submit-form"],[data-element-link="#submit-form"]', function () {
    const $button = $(this)
    if ($button.closest('[data-page-element="Checkout/V1"]').length == 0) {
      handleFormSubmit($button)
    }
  })
})

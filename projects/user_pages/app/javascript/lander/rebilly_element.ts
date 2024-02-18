import { submitPage, restoreButtonState, checkValidInputs } from './submit'

// TODO: gotta review some types in this file
type RebillyDetailError = {
  'data-rebilly': string
  error: string
  humanFriendlyRegex: string
  invalidValue: string
  regex: RegExp
}
type RebillyInvalidField = {
  message: string
  field: string
}
type RebillyError = {
  code: string
  details: string[] | RebillyDetailError[]
  invalidFields: RebillyInvalidField[]
  message: string
  type: string
}

const scrollToForm = () => {
  if (!$('.elPAI').length) return
  $([document.documentElement, document.body]).animate({ scrollTop: $('.elPAI').offset().top - 50 }, 200)
}

globalThis.addEventListener('load', function () {
  $(document).on('change', '.elInput', function () {
    globalThis.processForm()
  })

  window.addEventListener('payments:token-ready', () => {
    globalThis.processForm()
    if (!checkValidInputs()) {
      restoreButtonState()
      scrollToForm()
      this.window.dispatchEvent(new CustomEvent('payments:submit-failed'))
      return
    }
    submitPage()
  })
})

// NOTE: Rebilly restrictions based on:
// https://www.rebilly.com/docs/dev-docs/api/operation/PostToken/#!path=0/leadSource&t=request
// https://www.rebilly.com/docs/dev-docs/lead-sources/
type RebillyLeadSources = Record<string, string>
type RebillyLeadSourcesMapping = Record<string, { name?: string }>
function leadSourceGenerator(): RebillyLeadSources {
  const DEFAULT_MAX_CHARS_LENGTH = 512
  const leadQueryParamMapping: RebillyLeadSourcesMapping = {
    utm_source: {
      name: 'source',
    },
    utm_medium: {
      name: 'medium',
    },
    utm_campaign: {
      name: 'campaign',
    },
    utm_term: {
      name: 'term',
    },
    utm_content: {
      name: 'content',
    },
    affiliate: {},
    subAffiliate: {},
    clickId: {},
    salesAgent: {},
  }
  const params = new URLSearchParams(window.location.search)
  return Array.from(params.keys()).reduce((acc, key) => {
    const mappedValue = leadQueryParamMapping[key]
    if (mappedValue) {
      const paramValue = params.get(key)
      const leadSourceName = mappedValue.name ?? key
      acc[leadSourceName] = paramValue.substring(0, DEFAULT_MAX_CHARS_LENGTH)
    }
    return acc
  }, {})
}

export const rebillyProcessOrder = (): void => {
  const Rebilly = globalThis.Rebilly
  let extraData = {
    method: globalThis.paymentsSelectedPaymentMethod,
  }

  const leadSource = leadSourceGenerator()
  if (Object.keys(leadSource).length) {
    extraData = { ...extraData, leadSource } as any
  }

  const form = document.querySelector('#cfAR')
  window.dispatchEvent(new CustomEvent('payments:clear-errors'))
  globalThis.processForm()
  if (!checkValidInputs()) {
    restoreButtonState()
    scrollToForm()
    window.dispatchEvent(new CustomEvent('payments:submit-failed'))
    return
  }

  Rebilly.createToken(form, extraData)
    .then(function (result) {
      console.log('Framepay success', result)
      globalThis.parent.postMessage('success', '*')
      submitPage()
    })
    .catch(function (error: RebillyError) {
      console.log('Framepay error', error)
      globalThis.parent.postMessage('error', '*')
      ;(form.querySelector('input[data-rebilly="token"]') as any).value = ''
      window.dispatchEvent(
        new CustomEvent('payments:set-token-error', {
          detail: {
            error: error,
          },
        })
      )
      restoreButtonState()
      scrollToForm()
      window.dispatchEvent(new CustomEvent('payments:submit-failed'))
    })
}
globalThis.rebillyProcessOrder = rebillyProcessOrder
globalThis.scrollToForm = scrollToForm

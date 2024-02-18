import { ProductVariantType } from './types'
;(function () {
  window.addEventListener('load', function () {
    const orderCart = window['OrderCart/V1']?.default
    let previousRadioProductVariant: ProductVariantType
    document.querySelectorAll('.elOrderSelect').forEach(function (orderSelect) {
      const type = orderSelect.getAttribute('data-order-select-type')
      // If Order Select Type is "single" so only one product variant can be selected, so we make the first input from
      // radio buttons selected
      // NOTE: This could also be done in rendering process to avoid screen flickering
      if (type == 'single') {
        const firstInput = <HTMLInputElement>orderSelect.querySelector('input[type="radio"]')
        if (firstInput) {
          firstInput.checked = true
        }
        const newProductVariant = orderCart.getProductVariant(firstInput, 'single')
        previousRadioProductVariant = newProductVariant
        orderCart.updateProductVariant(newProductVariant)
      }
    })

    $(document).on('change', '.elOrderSelect input[type="radio"]', function (event) {
      const input = event.target as HTMLInputElement

      // Propagate this change across all order elOrderSelect elements (there can be multiple of these on the page)
      $(`.elOrderSelect input[type="radio"][value=${input.value}]`).prop('checked', true)

      const newProductVariant = orderCart.getProductVariant(input, 'single')
      if (previousRadioProductVariant) {
        orderCart.incrementProductVariantQuantity(previousRadioProductVariant, -1)
      }
      orderCart.updateProductVariant(newProductVariant)
      previousRadioProductVariant = newProductVariant
    })

    $(document).on('change', '.elOrderSelect input[type="number"]', function (event) {
      const input = event.target as HTMLInputElement
      const productVariantId = input.getAttribute('data-product-variant-id')
      const quantity = input.value

      // Propagate this change across all order elOrderSelect elements (there can be multiple of these on the page)
      $(`.elOrderSelect input[type="number"][data-product-variant-id="${productVariantId}"]`).val(quantity)

      const productVariant = orderCart.getProductVariant(input, 'multiple')

      orderCart.updateProductVariant(productVariant)
    })

    $(document).on('change', '.elOrderProductOptionsPrice select', function (event) {
      const priceSelect = event.target as HTMLSelectElement
      const productVariantId = priceSelect.getAttribute('data-product-variant-id')
      const priceId = priceSelect.value
      const priceCents = priceSelect
        .querySelector(`option[value="${priceId}"`)
        .getAttribute('data-product-variant-price-cents')
      const orderSelectType = document.querySelector('.elOrderSelect').getAttribute('data-order-select-type')
      const orderSelectInputType = orderSelectType == 'single' ? 'radio' : 'number'
      const productVariantInput: HTMLInputElement = document.querySelector(
        `.elOrderSelect input[type="${orderSelectInputType}"][data-product-variant-id="${productVariantId}"]`
      )

      productVariantInput.setAttribute('data-product-variant-price-id', priceId)
      productVariantInput.setAttribute('data-product-variant-price-cents', priceCents)

      if (orderSelectType == 'single' && !productVariantInput.checked) return

      const productVariant = orderCart.getProductVariant(productVariantInput, orderSelectType)

      orderCart.updateProductVariant(productVariant)
    })

    $(document).on('change', '.elOrderBump input', function (event) {
      const input = event.target as HTMLInputElement
      const productVariant = orderCart.getProductVariant(input)

      orderCart.updateProductVariant(productVariant)
    })

    $(document).on('change', '.elOrderBump select', function (event) {
      const select = event.target as HTMLSelectElement
      const productId = select.getAttribute('data-product-id')
      const selectedOption = select.querySelector(`option[value="${select.value}"]`)
      const productInput: HTMLInputElement = document.querySelector(
        `.elOrderBump input[data-product-id="${productId}"]`
      )

      const variantAttrs = ['id', 'name', 'price-id', 'price-cents', 'price-currency']
      variantAttrs.forEach(function (variantAttr) {
        productInput.setAttribute(
          `data-product-variant-${variantAttr}`,
          selectedOption.getAttribute(`data-product-variant-${variantAttr}`)
        )
      })

      if (!productInput.checked) return

      const productVariant = orderCart.getProductVariant(productInput)

      orderCart.updateProductVariant(productVariant)
    })

    $(document).on('click', '.elOrderCoupon button', function () {
      const input: HTMLInputElement = document.querySelector('.elOrderCoupon input')
      orderCart.updateCouponCode(input.value)
    })

    // [TEMP] Hack to get around readonly bug
    document.querySelectorAll('.elOrderCoupon input[readonly]').forEach(function (element) {
      element.removeAttribute('readonly')
    })
  })
})()

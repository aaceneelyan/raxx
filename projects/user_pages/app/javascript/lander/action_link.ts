function setupActionLinkListeners() {
  // Print Page (webinars)
  $(document).on('click', "a[href='#print'], [data-element-link='#print']", function () {
    window.print()

    return false
  })

  $(document).on('click', "[data-element-link='#open-popup'], [href='#open-popup']", function (evt) {
    const checkIfShowHide = evt.target.parentElement.getAttribute('data-elbuttontype')
    if (typeof checkIfShowHide == 'undefined' || !['2', 'showHide'].includes(checkIfShowHide)) {
      globalThis.CFOpenPopup()
    }
  })

  $(document).on('click', "[data-element-link='#close-popup'], [href='#close-popup']", function () {
    globalThis.CFClosePopup()
  })

  // Scroll To Block Area
  $(document).on('click', "a[href*='#scroll-'], [data-element-link*='#scroll-']", function (evt) {
    const href = evt.currentTarget.getAttribute('href') ?? ''
    const [, id] = href?.split('#scroll-')

    if (id) {
      const $el = $(`.${id}`)
      const popupParent = $el.parents('.modal-wrapper')
      $(popupParent.length > 0 ? popupParent : 'html, body').animate({ scrollTop: $el.offset().top }, 500)
    }

    return false
  })

  const getElementsIds = (evt, type) =>
    (evt.currentTarget.getAttribute(`data-${type}-button-ids`) || '').split(',').filter((s) => s)

  const performActionOnId = (id, action) => {
    const $el = $(`.${id}`) as any

    $el[action](500)
  }

  // Show / Hide
  $(document).on('click', "a[href*='#show-hide'], [data-element-link*='#show-hide']", function (evt) {
    evt.preventDefault()

    const hideIds = getElementsIds(evt, 'hide')
    const showIds = getElementsIds(evt, 'show')

    hideIds.forEach((id) => performActionOnId(id, 'fadeOut'))
    showIds.forEach((id) => performActionOnId(id, 'fadeIn'))

    return false
  })
}

window.addEventListener('load', setupActionLinkListeners)

const internalLinks = ['#open-popup', '#close-popup', '#submit-form']

function setupLinkableElements() {
  document.querySelectorAll<HTMLElement>('[data-element-link]').forEach((elLinkableElement) => {
    const dataLinkableElementLink = elLinkableElement.getAttribute('data-element-link')
    if (dataLinkableElementLink) {
      // Add keyboard accessibility for linkable element which have a link attribute.
      elLinkableElement.setAttribute('tabindex', '0')

      if (!internalLinks.includes(dataLinkableElementLink)) {
        elLinkableElement.addEventListener('click', () => {
          const target = elLinkableElement.getAttribute('target') ?? '_self'
          if (target === '_self') {
            window.location.href = dataLinkableElementLink
          } else {
            window.open(dataLinkableElementLink, '_blank')
          }
        })
      }
    }
  })
}

window.addEventListener('load', setupLinkableElements)

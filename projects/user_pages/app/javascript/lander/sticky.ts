// TODO: Ideally we want this functionality implemented using IntersectionObserver

function cloneSticky(sticky: JQuery) {
  const stickyClone = sticky.clone(true, true).addClass('stickyClone')
  sticky.parent().append(stickyClone)
  globalThis.CF2Component.hydrateTree(stickyClone.get(0))
}

$(document).ready(function () {
  const $stickyElements = $('.stickyTop')

  $stickyElements.each((_index, element) => {
    const sticky = $(element)

    let cloned = false
    let scrollTop = $(window).scrollTop()
    let stickyTop = sticky.offset().top

    // Initial check to see if page is already scrolled when loaded
    if (scrollTop > stickyTop) {
      cloneSticky(sticky)
      cloned = true
    }
    document.addEventListener('scroll', () => {
      scrollTop = $(window).scrollTop()
      stickyTop = sticky.offset().top

      if (scrollTop >= stickyTop && !cloned) {
        cloneSticky(sticky)
        cloned = true
      }
      if (scrollTop < stickyTop && cloned) {
        sticky.parent().find('> .stickyClone').remove()
        cloned = false
      }
    })
  })
})

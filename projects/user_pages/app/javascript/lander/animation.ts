const unobserve = (element: Element, observer: IntersectionObserver) => {
  observer.unobserve(element)
  if (element.getAttribute('data-animation-once') !== 'true') {
    const time = element.getAttribute('data-animation-time')
    const delay = element.getAttribute('data-animation-delay')
    const timeout = Number(time) + Number(delay)
    setTimeout(() => {
      observer.observe(element)
    }, timeout)
  }
}

const startAnimation = (element: Element) => {
  element.setAttribute('data-animation-state', 'running')
}

$(document).ready(function () {
  const runAllAnimations = function () {
    const scrollElements = document.querySelectorAll('[data-animation-trigger="scroll"]')
    const loadElements = document.querySelectorAll('[data-animation-trigger="load"]')

    const config = {
      rootMargin: '50px 20px 75px 30px',
      threshold: [0, 0.25, 0.75, 1],
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          if (entry.target.getAttribute('data-animation-state') !== 'running') {
            unobserve(entry.target, observer)
            startAnimation(entry.target)
          }
        } else {
          entry.target.setAttribute('data-animation-state', 'off')
        }
      })
    }, config)

    scrollElements.forEach((element) => {
      observer.observe(element)
    })

    loadElements.forEach((element) => {
      startAnimation(element)
    })
  }

  runAllAnimations()
})

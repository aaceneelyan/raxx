globalThis.ClickFunnels = globalThis.ClickFunnels ?? {}

export const populateSelect = (selectElement: HTMLElement, type = undefined): void => {
  type = type ?? $(selectElement).parents('.elSelectWrapper').attr('data-type')
  let items
  const allCountries = globalThis.ClickFunnels.all_countries
  if (type == 'all_united_states') {
    selectElement.innerHTML = '<option> Select State </option>'
    items = allCountries.find((c) => c.iso2 == 'US')?.regions
    items.forEach((item) => (selectElement.innerHTML += `<option value="${item.state_code}" > ${item.name} </option>`))
  } else if (type == 'all_canadian_provinces') {
    selectElement.innerHTML = '<option> Select State </option>'
    items = allCountries.find((c) => c.iso2 == 'CA')?.regions
    items.forEach((item) => (selectElement.innerHTML += `<option value="${item.state_code}" > ${item.name} </option>`))
  } else if (type == 'all_countries') {
    const topMapping = ['US', 'CA', 'GB', 'IE', 'AU', 'NZ']
    const topHash = topMapping.reduce((acc, val) => {
      acc[val] = true
      return acc
    }, {})
    const topOptions: { iso2: string; name?: string }[] = topMapping.map((iso2) => ({ iso2 }))
    const remainingOptions = []

    allCountries.forEach((item) => {
      if (topHash[item.iso2]) {
        const option = topOptions.find((option) => option.iso2 == item.iso2)
        option.name = item.name
      } else {
        remainingOptions.push(item)
      }
    })
    let html = ''
    // let html = '<option value=""> Select Country </option>'
    // html += '<option value="">------------------------------</option>'
    topOptions.forEach((item) => (html += `<option value="${item.iso2}" > ${item.name} </option>`))
    // html += '<option value="">------------------------------</option>'
    remainingOptions.forEach((item) => (html += `<option value="${item.iso2}" > ${item.name} </option>`))
    selectElement.innerHTML = html
  }
}
globalThis.ClickFunnels.populateSelect = populateSelect
window.addEventListener('load', function () {
  if (!$('.elCheckout, .elSelect, .elSuperSelect').length) return
  if ($('[data-page-element="Checkout/V2"]').length) return
  $.ajax({
    type: 'GET',
    contentType: 'application/json',
    url: '/cf_countries_states',
  }).then((data) => {
    globalThis.ClickFunnels.all_countries = data.result
    window.dispatchEvent(new CustomEvent('CF2_COUNTRIES_FETCHED'))
    $('.elSelect, .elSuperSelect').each((index, element) => {
      populateSelect(element as HTMLElement)
    })
  })
})

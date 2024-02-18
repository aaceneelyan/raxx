import { populateSelect } from './populate_select'
window.addEventListener('CF2_COUNTRIES_FETCHED', function () {
  const $allCountrySelects = $(".elSelectWrapper[data-type='all_countries'] .elSelect[name='country']")
  const $allStateInputs = $(".elInput[name='state']")
  let $allStates = $(".elSelect[name='state']")

  if ($allCountrySelects.length && $allStates.length && !$allStateInputs.length) {
    $allCountrySelects.on('change', function () {
      const $select = $(this)
      const val = $select.val()
      $allStates = $(".elSelect[name='state']")
      if (val != 'US') {
        $allStates.html('')
        $allStates.val('')
        ;($allStates as any).changeElementType('input')
        $allStates = $(".elSelect[name='state']")
        $allStates.attr('placeholder', 'Shipping State')
      } else {
        $allStates.val('')
        ;($allStates as any).changeElementType('select')
        $allStates = $(".elSelect[name='state']")
        $allStates.each((index, element) => populateSelect(element as HTMLElement))
      }
    })
    $allCountrySelects.trigger('change')
  }
})

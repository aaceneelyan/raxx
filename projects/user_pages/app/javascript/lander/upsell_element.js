import {
    submitPage
} from './submit';
(function() {
    window.addEventListener('load', function() {
        $(document).on('click', '#upsell-submit-button', function(event) {
            event.preventDefault()
            submitUpsellOrder()
        })
    })
})()

export const submitUpsellOrder = () => {
    $('#cfAR input[data-order-form]').val(true)
    submitPage()
}
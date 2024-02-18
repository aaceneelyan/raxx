/* eslint-disable max-len */
// TODO (ClickFunnels2 - Editor Team): Use countdown dependency to all countdown elements https://cdn.jsdelivr.net/gh/kbwood/countdown
// TODO (ClickFunnels2 - Editor Team): Use moment dependency to all countdown elements. https://cdnjs.cloudflare.com/ajax/libs/moment.js
// TODO (ClickFunnels2 - Editor Team): Use moment-timezone dependency to all countdown elements. https://cdnjs.cloudflare.com/ajax/libs/moment-timezone
// TODO (ClickFunnels2 - Editor Team): Use addevent dependency to autowebinar_ty_addevent element. https://addevent.com/libs/atc/1.6.1
// TODO (ClickFunnels2 - Editor Team): Use moment dependency to elVideoUnlockerElement element. https://cdnjs.cloudflare.com/ajax/libs/moment.js/
// TODO (ClickFunnels2 - Editor Team): Use moment-timezone dependency to elVideoUnlockerElement element. https://cdnjs.cloudflare.com/ajax/libs/moment-timezone
// TODO (ClickFunnels2 - Editor Team): Use social-likes dependency to _multichoice.html.erb element. <script src="https://cdnjs.cloudflare.com/ajax/libs/social-likes
// https://3.basecamp.com/4903236/buckets/19702927/todos/3503657437

require('./lander/utils/replace_tag')
require('./lander/utils/fetcher')
require('Shared/javascript/parseurl')
// require('Shared/javascript/cf_utils')
// require('Shared/javascript/facebook_messenger_checkbox')

// require('./lander/page')
require('./lander/audio_player')
// require('./lander/membership')
// require('./lander/dataParams')
// require('./lander/videounlocker')
// require('./lander/survey_stats_keen')
require('./lander/vendor/garlic.cf.js')
// require('./lander/cf_pe_orders/base')
// require('./lander/cf_browser_notifier')
// require('./lander/product_quantity_limiter')
// require('./lander/affiliate_login')
// require('./lander/read_cookie')
// require('./lander/facebook_optin')
// require('./lander/payselect')
// require('./lander/mobile_safari_ios11_input_fix')
// require('./lander/redirect_loops_limiter')
// require('./lander/cb_headline')
// require('./lander/round_up')
// require('./lander/infusionsoft_tokenization')
// require('./lander/survey_results')
// require('./lander/base')
// require('./lander/chunk_moment')
// require('./lander/lesson')
// require('./lander/cookieconsent')
require('./lander/populate_select')
require('./lander/runtime_events')
require('./lander/fhl_handle_select_transformation')
// require('./lander/privacy_notice')
require('./lander/track_events')
require('./lander/rebilly_element')
require('./lander/upsell_element')
require('./lander/order/main')

/** New runtime modules in typescript **/

require('./lander/runtime')
require('./lander/action_link')
require('./lander/animation')
require('./lander/linkable')
require('./lander/submit')
require('./lander/sticky')

window.nanostores = require('nanostores')

window.inflightRequests = 0
window.fetch = new Proxy(window.fetch, {
    apply(fetch, that, args) {
        window.inflightRequests++
            return fetch.apply(that, args).finally(() => {
                window.inflightRequests--
            })
    },
})

// NOTE: This is custom code app. Mainly applying garlic to all form fields labelled as
// "elFormItem" and without the data-prevent-garlic attribute.
$(window).on('load', function() {
    $('.elFormItem:not([data-prevent-garlic="true"])').each(function() {
        let onPersist = () => {}
        if (this.getAttribute('name') == 'name') {
            // NOTE: when changing full_name field, we need to update first_name and last_name fields
            // so that they are in sync with the full_name field when the page is reloaded.
            onPersist = () => {
                const value = this.value.trim()
                const firstName = value.split(' ')[0]
                const lastName = value.split(' ').slice(1).join(' ')
                window.cfGarlicUtils.store('first_name', firstName)
                window.cfGarlicUtils.store('last_name', lastName)
            }
        }
        $(this).garlic({
            onPersist,
            onRetrieve: function(elem, retrievedValue) {
                const elemName = elem.get(0).getAttribute('name')
                globalThis.CFGarlicValues[elemName] = retrievedValue
            },
        })
    })
})
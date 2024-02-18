import cfHoy from '@clickfunnels2/cfhoy.js'
import {
    Cookies
} from '@clickfunnels2/cfhoy.js'

function cfhoyVisitorData() {
    return {
        firstName: Cookies.get('contact_first_name'),
        lastName: Cookies.get('contact_last_name'),
        emailAddress: Cookies.get('contact_email_address'),
        phoneNumber: Cookies.get('contact_phone_number'),
        postalCode: Cookies.get('contact_postal_code'),
        country: Cookies.get('contact_country'),
        uuid: Cookies.get('cfhoy_visitor')
    }
}

function getLeadEventID() {
    return Cookies.get('cfhoy_lead_event_id')
}

function removeLeadEventID() {
    Cookies.set('cfhoy_lead_event_id', '', -1)
    return true
}

function getPurchaseEventID() {
    return Cookies.get('cfhoy_purchase_event_id')
}

function removePurchaseEventID() {
    Cookies.set('cfhoy_purchase_event_id', '', -1)
    return true
}


let livePage = isLivePage(window.location.search)
let trackingDisabled = window.disableTracking

// ahoy
if (!trackingDisabled && livePage) {
    // we need to configure ahoy before DOMContentLoaded event
    // so it can track the visit correctly
    cfHoy.configure({
        urlPrefix: "/_tracking",
        visitsUrl: '/visits',
        eventsUrl: '/events',
        platform: 'Web',
        useBeacon: true,
        startOnReady: true,
        trackVisits: true,
        cookies: true,
        withCredentials: false,
        visitDuration: 4 * 60, // 4 hours
        visitorDuration: 2 * 365 * 24 * 60, // 2 years
    })

    document.addEventListener('cfhoy:tracked', function(event) {
        window.dataLayer = window.dataLayer || [];
        if (event.detail.name == "$view") {
            const visitorData = cfhoyVisitorData();
            dataLayer.push({
                event: "cfPageView",
                contactFirstName: visitorData.firstName,
                contactLastName: visitorData.lastName,
                contactEmailAddress: visitorData.emailAddress,
                contactPhoneNumber: visitorData.phoneNumber,
                contactPostalCode: visitorData.postalCode,
                contactCountry: visitorData.country,
                contactExternalID: visitorData.uuid,
                visitEventID: event.detail.id
            })
        }
    })
    document.addEventListener('DOMContentLoaded', function(event) {
        cfHoy.trackClicks("a, button, input[type=submit]");
        cfHoy.trackSubmits("form");
        cfHoy.trackChanges("input, textarea, select");
        cfHoy.trackView({
            cfhoy_visitor: $.cookie('cfhoy_visitor') || ''
        })

        $(document).on('click', '[event-tracking="enable"]', function() {
            const data = {
                url: window.location.href,
                page: window.location.pathname,
                title: document.title,
            }

            cfHoy.track('click-custom-button', data)
        })
    })
}

function isLivePage(queryString) {
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get('preview') !== 'true'
}


document.addEventListener('DOMContentLoaded', function(event) {
    window.dataLayer = window.dataLayer || [];

    const visitorData = cfhoyVisitorData();
    const leadEventID = getLeadEventID();
    const purchaseEventID = getPurchaseEventID();

    if (leadEventID) {
        dataLayer.push({
            event: "cfLead",
            contactFirstName: visitorData.firstName,
            contactLastName: visitorData.lastName,
            contactEmailAddress: visitorData.emailAddress,
            contactPhoneNumber: visitorData.phoneNumber,
            contactPostalCode: visitorData.postalCode,
            contactCountry: visitorData.country,
            contactExternalID: visitorData.uuid,
            leadEventID: leadEventID
        })
        removeLeadEventID()
    }

    if (purchaseEventID) {
        dataLayer.push({
            event: "cfPurchase",
            contactFirstName: visitorData.firstName,
            contactLastName: visitorData.lastName,
            contactEmailAddress: visitorData.emailAddress,
            contactPhoneNumber: visitorData.phoneNumber,
            contactPostalCode: visitorData.postalCode,
            contactCountry: visitorData.country,
            contactExternalID: visitorData.uuid,
            purchaseEventID: purchaseEventID
        })
        removePurchaseEventID()
    }
})
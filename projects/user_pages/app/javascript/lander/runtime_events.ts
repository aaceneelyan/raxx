enum CFEvents {
  FORM_SUBMITTED = 'cf:form_submitted',
  FORM_SUBMITTED_OK = 'cf:form_submitted:ok',
  FORM_SUBMITTED_FINALIZED = 'cf:form_submitted:finalized',
}

;(globalThis as any).CFEvents = CFEvents
globalThis.CFDispatchEvent = function (eventName: CFEvents, detail: any) {
  const event = new CustomEvent(eventName, { detail })
  document.dispatchEvent(event)
}

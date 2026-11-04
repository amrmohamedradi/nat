// Lets any "Inquire" button preselect a service in the inquiry form
// without coupling components: the form listens for this event.

export const SELECT_SERVICE_EVENT = "nat:select-service";

// Anchor on the form panel itself, so "Inquire" lands on the fields rather than the section intro.
export const INQUIRY_ANCHOR = "inquiry";

export function selectService(serviceId: string) {
  window.dispatchEvent(new CustomEvent<string>(SELECT_SERVICE_EVENT, { detail: serviceId }));
}

/** Window event the AskMe panel listens for, so any component can open it without shared state. */
export const OPEN_EVENT = 'askme:open';

export function openAskMe() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

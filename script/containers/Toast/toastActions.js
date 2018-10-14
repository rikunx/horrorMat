import * as Toast from './toastActionTypes';

/**
 * Shows the toast notification
 * @export
 * @param {String} message - Message to display in the toast
 * @param {boolean} [isError=false] - (Optional) If true, colorizes the toast to prominently display the error
 * @param {number} [hideDelay=10000] - (Optional) Sets the amount of time before a toast is automatically hidden
 */
export function show(message, isError = false, hideDelay = 10000) {
    return { type: Toast.Show, message, isError, hideDelay };
}

/**
 * Hides the toast in the UI.
 * @export
 */
export function hide() {
    return { type: Toast.Hide };
}

// @flow
import { alertConstants } from "Constants";

const fetchFailMsg = "Unable to handle the request. Please contact Adminstrator";
export const successAlert = (message: string) => ({ type: alertConstants.SUCCESS, payload: message });
export const errorAlert = (error: string) => ({ type: alertConstants.ERROR, payload: error });
export const fetchFailAlert = () => ({ type: alertConstants.ERROR, payload: fetchFailMsg });
export const clearAlert = () => ({ type: alertConstants.CLEAR });

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToInternationalFormat = exports.removeSpacesAndPlus = void 0;
const libphonenumber_js_1 = require("libphonenumber-js");
function removeSpacesAndPlus(input) {
    // Remove all spaces from the string
    let result = input.replace(/\s+/g, "");
    // Remove '+' if it's at the start of the string
    result = result.replace(/^\+/, "");
    return result;
}
exports.removeSpacesAndPlus = removeSpacesAndPlus;
function convertToInternationalFormat(phoneNumber, countryCode) {
    const parsedPhoneNumber = (0, libphonenumber_js_1.parsePhoneNumberFromString)(phoneNumber, countryCode);
    if (!parsedPhoneNumber) {
        throw new Error("Invalid phone number");
    }
    // return removeSpacesAndPlus(parsedPhoneNumber.formatInternational());
    return parsedPhoneNumber.formatInternational();
}
exports.convertToInternationalFormat = convertToInternationalFormat;
//# sourceMappingURL=mobile_number.js.map
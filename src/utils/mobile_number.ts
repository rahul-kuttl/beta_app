import {
  parsePhoneNumberFromString,
  PhoneNumber,
  CountryCode,
} from "libphonenumber-js";

export function removeSpacesAndPlus(input: string): string {
  // Remove all spaces from the string
  let result = input.replace(/\s+/g, "");
  // Remove '+' if it's at the start of the string
  result = result.replace(/^\+/, "");
  return result;
}

export function convertToInternationalFormat(
  phoneNumber: string,
  countryCode: string
): string {
  const parsedPhoneNumber: PhoneNumber | undefined = parsePhoneNumberFromString(
    phoneNumber,
    countryCode as CountryCode
  );

  if (!parsedPhoneNumber) {
    throw new Error("Invalid phone number");
  }

  // return removeSpacesAndPlus(parsedPhoneNumber.formatInternational());
  return parsedPhoneNumber.formatInternational();
}

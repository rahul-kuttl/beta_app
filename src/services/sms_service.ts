import axios from "axios";

interface SmsServiceConfig {
  apiUrl: string;
  apiKey: string;
  senderId: string;
}

const SmsService =
  (config: SmsServiceConfig) => (mobileNumber: string, otp: string) => {
    const message = `Your OTP is: ${otp}`;

    // Sending SMS (impure function due to external API call)
    return axios
      .post(config.apiUrl, {
        api_key: config.apiKey,
        sender_id: config.senderId,
        message,
        mobile_number: mobileNumber,
      })
      .then((response) => {
        console.log(`OTP sent to ${mobileNumber}`);
        return response;
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        throw new Error("Failed to send OTP");
      });
  };

// Example usage:
// const sendOtp = createSmsSender({
//   apiUrl: 'https://api.smsprovider.com/send',
//   apiKey: 'your_api_key',
//   senderId: 'your_sender_id'
// });
// sendOtp('1234567890', '1234').then(...).catch(...);

export default SmsService;

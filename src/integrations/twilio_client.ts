import twilio from 'twilio';
import config from '../../config/config';

const twilioClient = twilio(
  config.twilioConfig.accountSid,
  config.twilioConfig.authToken,
);

export default twilioClient;

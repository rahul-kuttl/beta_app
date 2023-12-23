// src/utils/aws.util.ts
import AWS from "aws-sdk";

const sns = new AWS.SNS({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const sendOtp = async (
  mobileNumber: string,
  otp: string
): Promise<void> => {
  const params = {
    Message: `Your OTP is: ${otp}`,
    PhoneNumber: mobileNumber,
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        "DataType": "String",
        "StringValue": "YourSenderID",
      },
    },
  };

  await sns.publish(params).promise();
};

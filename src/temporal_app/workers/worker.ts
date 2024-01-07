import { Worker, NativeConnection } from '@temporalio/worker';
import {
  generateOtpActivity,
  sendSmsActivity,
  checkUserExistsActivity,
  createNewUserActivity,
  generateTokenActivity,
  getCurrentTimeActivity,
} from '../activities';
import mongoose from 'mongoose';
import config from '../../config/config';
import fs from 'fs';

// Path to your certificate files
const certPath = '../../temporal_certificates/temporal-ca-cert-x509';
const keyPath = '../../temporal_certificates/temporal-ca-cert-x509-key';
const caPath = '../../temporal_certificates/temporal-ca-cert';

// Load certificates
const cert = fs.readFileSync(certPath);
const key = fs.readFileSync(keyPath);
const ca = fs.readFileSync(caPath);

async function runWorker() {
  // Connect to MongoDB
  await mongoose.connect(config.mongodb.dbURI);
  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });

  const connection = await NativeConnection.connect({
    address: config.temporalCloudAddress, // defaults port to 7233 if not specified
    tls: {
      // set to true if TLS without mTLS
      // See docs for other TLS options
      clientCertPair: {
        crt: cert,
        key: key,
      },
    },
  });
  const worker = await Worker.create({
    connection,
    namespace: config.temporalNamespace,
    workflowsPath: require.resolve('../workflows/login_workflow'), // Path to the compiled workflows
    activities: {
      generateOtpActivity,
      sendSmsActivity,
      checkUserExistsActivity,
      createNewUserActivity,
      generateTokenActivity,
      getCurrentTimeActivity,
    },
    taskQueue: process.env.TEMPORAL_USER_TASK_QUEUE || 'll',
  });

  // Start listening for tasks from the Temporal service
  await worker.run();

  console.log('Worker started');
}

runWorker().catch((err) => {
  console.error(err);
  // process.exit(1);
});

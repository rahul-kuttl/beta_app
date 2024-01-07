"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const temporal_client_1 = require("../integrations/temporal_client");
const login_workflow_1 = require("../temporal_app/workflows/login_workflow");
const error_util_1 = require("../utils/error_util");
const mobile_number_1 = require("../utils/mobile_number");
const loginController = async (req, res) => {
    // Extract mobile number, dial code, and OTP from the request body
    const { mobileNumber, dialCode, otp } = req.body;
    console.log(req.body);
    // Validate input: Ensure mobile number and dial code are provided
    if (!mobileNumber || !dialCode) {
        throw new error_util_1.UserInputError("Mobile number and dial code are required.");
    }
    const isoFormattedMobileNumber = (0, mobile_number_1.convertToInternationalFormat)(mobileNumber, dialCode);
    console.log(`mobile number is :+${dialCode}-${mobileNumber}`);
    // Hash mobile number for privacy
    // Construct a unique workflow ID using the mobile number and dial code
    const workflowId = `${isoFormattedMobileNumber}`;
    try {
        // Check if a workflow with this ID already exists
        const workflowExists = await temporal_client_1.temporalClient.checkWorkflowExists(workflowId);
        if (workflowExists) {
            const workflowStatus = await temporal_client_1.temporalClient.checkWorkflowStatus(workflowId);
            // ToDo: analyze & fix race condition here. for now since frontend has
            // timeout based otp generation, so we can go in beta.
            //console.log(workflowExists,workflowStatus)
            if (workflowStatus === "RUNNING") {
                if (otp) {
                    // Signal the workflow with the provided OTP
                    //console.log(otp,workflowId)
                    await temporal_client_1.temporalClient.signalWorkflow(workflowId, "continueWithOtp", {
                        inputOtp: otp,
                    });
                    // Wait for the result of the workflow (e.g., successful login or error)
                    const result = await temporal_client_1.temporalClient.getWorkflowResult(workflowId);
                    //console.log(result)
                    return res.status(200).json(result);
                }
                else {
                    return res.status(200).json({ message: "OTP is mandatory" });
                }
            }
            else {
                // ToDo: Sometimes workflow is getting created with no duplicate policy
                // Start the login workflow with the provided mobile number and dial code
                await temporal_client_1.temporalClient.startDuplicateWorkflow(login_workflow_1.LoginWorkflow, { mobileNumber: isoFormattedMobileNumber, dialCode }, workflowId);
                // start new run workflow
                if (otp) {
                    return res.status(200).json({ message: "OTP is being resent" });
                }
                else {
                    return res.status(200).json({ message: "OTP is being sent" });
                }
            }
        }
        // If the workflow does not exist, start a new login workflow
        // if (!workflowExists) {
        // Start the login workflow with the provided mobile number and dial code
        await temporal_client_1.temporalClient.startDuplicateWorkflow(login_workflow_1.LoginWorkflow, { mobileNumber: isoFormattedMobileNumber, dialCode }, workflowId);
        // Respond to the client indicating that the OTP is being sent
        return res.status(200).json({ message: "OTP is being sent." });
        // }
        // If none of the above conditions are met, return a default error
        // throw new Error("Unexpected error occurred.");
    }
    catch (error) {
        console.log(error);
        // Handle any errors that occur during the process
        res.status(500).json({ error: error });
    }
};
exports.loginController = loginController;
//# sourceMappingURL=auth_contoller.js.map
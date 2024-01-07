export interface LoginWorkflowInput {
    mobileNumber: string;
    dialCode: string;
}
export interface LoginWorkflowResult {
    error: {
        hasError: boolean;
        list: string[];
    };
    data?: {
        message: string;
        mobileNumber: string;
        dialCode: string;
        isNewUser: boolean;
        token?: string;
    };
    message: string;
}
export declare function LoginWorkflow(input: LoginWorkflowInput): Promise<LoginWorkflowResult>;
//# sourceMappingURL=login_workflow.d.ts.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Create a Mongoose schema for the payment method document
const PaymentMethodSchema = new mongoose_1.Schema({
    paymentMethod_id: { type: String, required: true },
    method: { type: String, required: true },
    details: {
        card_number: { type: String, required: true },
        bank_name: { type: String, required: true },
    },
}, { timestamps: true }); // Enable timestamps for 'createdAt' and 'updatedAt' fields
// Create an index for 'paymentMethod_id' with a unique constraint
PaymentMethodSchema.index({ paymentMethod_id: 1 }, { unique: true });
exports.PaymentMethodModel = mongoose_1.default.model('PaymentMethod', PaymentMethodSchema);
exports.default = exports.PaymentMethodModel;
//# sourceMappingURL=_payment_method_model.js.map
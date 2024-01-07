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
exports.PaymentRecordModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Create a Mongoose schema for the payment record document with TypeScript
const PaymentRecordSchema = new mongoose_1.Schema({
    paymentRecordId: { type: String, required: true },
    paymentStatus: { type: String, default: null },
    amountDue: { type: Number, default: null },
    type: { type: String, required: true },
    timestamp: { type: String, required: true },
    currency: { type: String, required: true },
    amount: { type: Number, default: null },
    status: { type: String, default: null },
    details: { type: mongoose_1.Schema.Types.Mixed, default: null }, // Using Schema.Types.Mixed for 'any' type
}, { timestamps: true });
// Create an index for 'paymentRecordId' with a unique constraint
PaymentRecordSchema.index({ paymentRecordId: 1 }, { unique: true });
exports.PaymentRecordModel = mongoose_1.default.model('PaymentRecord', PaymentRecordSchema);
exports.default = exports.PaymentRecordModel;
//# sourceMappingURL=_payment_detail_model.js.map
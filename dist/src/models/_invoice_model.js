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
exports.NewInvoiceModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Create a Mongoose schema for the new Invoice document with TypeScript
const NewInvoiceSchema = new mongoose_1.Schema({
    buyer: {
        name: { type: String, required: true },
        contact: {
            phoneNumber: String,
            address: {
                street: String,
                city: String,
                state: String,
                postal_code: String,
                country: String,
            },
        },
        seller: {
            name: { type: String, required: true },
            contact: {
                phoneNumber: String,
                address: {
                    street: String,
                    city: String,
                    state: String,
                    postal_code: String,
                    country: String,
                },
            },
            linkedBusinessId: String,
        },
    },
    line_items: {
        list: [
            {
                product_name: { type: String, required: true },
                quantity: { type: Number, required: true },
                gross_amount: { type: Number, required: true },
                discount: { type: Number, required: true },
                taxable_value: { type: Number, required: true },
                igst: { type: Number, required: true },
                total: { type: Number, required: true },
                hsn_sac_code: { type: String, required: true },
                hsn_sac_category: {
                    section: { type: Number, required: true },
                    chapter: { type: Number, required: true },
                    heading: { type: Number, required: true },
                    description: { type: String, required: true },
                },
            },
        ],
    },
    payment: {
        payment_method: { type: String, required: true },
        payment_method_type: { type: String, required: true },
        payment_status: { type: String, required: true },
        total_paid_tax: { type: Number, required: true },
        grand_total: { type: Number, required: true },
    },
    invoice_id: { type: String, required: true },
}, { timestamps: true });
exports.NewInvoiceModel = mongoose_1.default.model('NewInvoice', NewInvoiceSchema);
exports.default = exports.NewInvoiceModel;
//# sourceMappingURL=_invoice_model.js.map
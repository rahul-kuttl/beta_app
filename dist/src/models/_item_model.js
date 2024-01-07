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
exports.PurchaseLineItemModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Create a Mongoose schema for the purchase line item document
const PurchaseLineItemSchema = new mongoose_1.Schema({
    purchaseLineItem_id: { type: String, required: true },
    line_items: [{
            sr_no: { type: Number, required: true },
            description: { type: String, required: true },
            unit_of_measure: { type: String, required: true },
            quantity: { type: Number, required: true },
            unit_price: { type: Number, required: true },
            amount: { type: Number, required: true },
            discount: { type: Number, required: true },
            net_assessable_value: { type: Number, required: true },
            SAC: { type: String, default: null },
            period: { type: String, default: null },
            charges: { type: String, default: null },
        }],
}, { timestamps: true });
// Create an index for 'purchaseLineItem_id' with a unique constraint
PurchaseLineItemSchema.index({ purchaseLineItem_id: 1 }, { unique: true });
exports.PurchaseLineItemModel = mongoose_1.default.model('PurchaseLineItem', PurchaseLineItemSchema);
exports.default = exports.PurchaseLineItemModel;
//# sourceMappingURL=_item_model.js.map
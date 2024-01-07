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
exports.Purchase = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Schema for Item Details
const itemDetailsSchema = new mongoose_1.Schema({
    purchaseItemId: String,
    dateOfPurchase: String,
    isBookmarked: Boolean,
    itemTitle: String,
    itemStatus: String,
    itemStatusColor: String,
    itemInsight: String,
    itemImage: String,
    brandBanner: String
});
// Schema for Purchase Item
const purchaseItemSchema = new mongoose_1.Schema({
    itemDetails: itemDetailsSchema
});
// Schema for Purchase
const purchaseSchema = new mongoose_1.Schema({
    purchaseItems: [purchaseItemSchema]
});
exports.Purchase = mongoose_1.default.model('Purchase', purchaseSchema, 'purchase'); // The third parameter ('purchase') here specifies the name of the MongoDB collection to which this model corresponds.
//# sourceMappingURL=purchase_model.js.map
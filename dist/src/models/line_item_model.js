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
exports.LineItem = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Schema Definitions
const shippingStatusSchema = new mongoose_1.Schema({
    status: String,
    date: String,
    detail: String,
});
const inDepthShippingDetailSchema = new mongoose_1.Schema({
    latestStatus: String,
    lastUpdated: String,
    summary: String,
    list: [shippingStatusSchema],
});
const brandDetailsSchema = new mongoose_1.Schema({
    name: String,
    banner: String,
    contactNumber: String,
    customerSupportEmail: String,
    websiteLink: String,
});
const lineItemSchema = new mongoose_1.Schema({
    brandBanner: String,
    brandName: String,
    itemBanner: String,
    itemTitle: String,
    status: String,
    orderId: String,
    dateOfPurchase: String,
    trackingId: String,
    warranty: String,
    logisticPartner: String,
    itemInsight: String,
    inDepthShippingDetail: inDepthShippingDetailSchema,
    brandDetails: brandDetailsSchema,
});
exports.LineItem = mongoose_1.default.model('LineItem', lineItemSchema, 'line_item');
//# sourceMappingURL=line_item_model.js.map
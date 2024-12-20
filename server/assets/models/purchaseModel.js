import { Schema, model } from 'mongoose';

const itemSchema = new Schema({
  vendorName: {
    type: String,   
    required: [true, 'Type the Vendor Name'],
  },
  date: {
    type: String,
    required: [true, 'Type the date when the item ordered.'],
  },
  expectedDeliveryDate: {
    type: String,
    required: [true, 'Date of expected for item.'],
  },
  status: {
    type: String,
    required: [true, 'status of the item.'], 
  },
  itemName: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: [true, 'quantity of the Item.'],
  },
  deliveryAddress: {
    type: String,
    required: [true, "Adrress for deliver the item."],
  },
  description: {
    type: String,
    required: [true, 'Type about the item.'],
  },
  quantityInHand: {
    type: String,
    default: 'N/A',
  },
  itemRequired: {
    type: String,
    default: 'N/A'
  },
  
});

const PurchaseModel = model('purchase', itemSchema);

export default PurchaseModel;
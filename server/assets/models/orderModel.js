import { Schema, model } from 'mongoose';

const purchaseSchema = new Schema({
  companyName: {
    type: String,
    required: [true, 'Type the company Name'],
  },
  contactNumber: {
    type: String,
    required: [true, 'provide contact number'],
  },
  companyAddress: {
    type: String,
    required: [true, 'Type the live Address of the company.'],
  },
  mailAddress: {
    type: String,
    required: [true, 'Type the Mail Address of the company.'],
  },
  date: {
    requied: true,
    type: String,
  },
  productName: {
    type: String,
    required: [true, 'Product Name'],
  },
  weight: {
    type: String,
    requied: [true, 'Provide product quantity'],
  },
  deliveryAddress: {
    type: String,
    required: [true, 'Type the Shipping Address'],
  },
});

const OrderModel = model('order', purchaseSchema);

export default OrderModel;

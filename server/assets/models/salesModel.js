import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  invoiceNumber: {
    type: String,
    unique: true,
  },
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
  status: { type: String, requied: true },
  price: {
    type: String,
    // required: [true, 'Single procuct Rate'],
  },
  deliveryAddress: {
    type: String,
    required: [true, 'Type the Shipping Address'],
  },
  totalAmount: {
    type: String,
    // required: [true, 'total amount'],
  },
  createdBy: {
    type: String
  }
});

const SalesModel = model('sale', productSchema);

export default SalesModel;

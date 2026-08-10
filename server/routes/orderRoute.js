import express from 'express';
import SalesModel from '../assets/models/salesModel.js';

// Customer-placed orders are stored as Sales records (status "Packed", price/totalAmount
// filled in later by an admin) rather than a separate Order collection — this matches how
// the customer dashboard (recentPurchases.jsx) actually reads/displays this data.

const router = express.Router();

router.get('/:id', async(req, res)=> {
  try {
    const { id } = req.params;
    console.log('Requested Id for get single data:', id);
    const orderData = await SalesModel.find({createdBy: id});
    console.log('Getting single data successful');
    console.log(orderData);
    return res
      .status(200)
      .send(orderData);
  } catch (error) {
    return res.status(500).send(error.message);
  }
})

router.post('/', async (req, res) => {
  try {
    const {
      invoiceNumber,
      companyName,
      contactNumber,
      companyAddress,
      mailAddress,
      date,
      productName,
      weight,
      deliveryAddress,
      createdBy
    } = req.body;
    const order = await SalesModel.create({
      companyName,
      invoiceNumber,
      contactNumber,
      companyAddress,
      mailAddress,
      status: "Packed",
      price: 'N/A',
      totalAmount: 'N/A',
      date,
      productName,
      weight,
      deliveryAddress,
      createdBy
    });

    return res
      .status(200)
      .send({ message: 'Data posted successful!', response: order });
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default router;

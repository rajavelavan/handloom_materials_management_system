import express, { response } from 'express';
import SalesModel from '../assets/models/salesModel.js';

const router = express.Router();

// { companyName, contactNumber, companyAddress, mailAddress, productName, weight, price, totalAmount,deliveryAddress }

router.get('/', async (req, res) => {
  try {
    const sales = await SalesModel.find({});
    console.log('data fetched success!');
    return res.status(200).send(sales);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Requested Id for get single data:', id);
    const sales = await SalesModel.findById(id);
    return res
      .status(200)
      .send({ message: 'Getting single data successful', response: sales });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  const number = `HMMS-${Math.floor(Math.random() * 1000000000)}`;
  try {
    const {
      companyName,
      contactNumber,
      companyAddress,
      mailAddress,
      productName,
      weight,
      price,
      date,
      status,
      totalAmount,
      deliveryAddress,
      createdBy
    } = req.body;
    const sales = await SalesModel.create({
      invoiceNumber: number,
      companyName,
      contactNumber,
      companyAddress,
      mailAddress,
      productName,
      weight,
      price,
      date,
      status,
      totalAmount,
      deliveryAddress,
      createdBy
    });

    return res
      .status(200)
      .send({ message: 'Data posted successful!', response: sales });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Updated Data from frontend:', id, req.body);
    const salesData = await SalesModel.findById({_id: id});
    if(salesData.invoiceNumber == "") {
      req.body.invoiceNumber = `HMMS-${Math.floor(Math.random() * 1000000000)}`;
    }
    const update = await SalesModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log('Data updated success!');
    return res.status(200).send(update);
  } catch (error) {
    return res.status(500).send('Put request failed!' + error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('requested Id:', id);
    const data = await SalesModel.findByIdAndDelete(id);
    console.log('Removed data:', data);
    return res
      .status(200)
      .send({ message: 'Data removed successful!', response: data });
  } catch (error) {
    return res.status(500).send('Error in removing data');
  }
});

export default router;

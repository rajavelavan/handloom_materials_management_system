import express, { response } from 'express';
import PurchaseModel from '../assets/models/purchaseModel.js';

const router = express.Router();

// { vendorName, date, expectedDeliveryDate,status, itemName, weight, amount, deliveryAddress, description, quantityInHand, itemRequired }

router.get('/', async (req, res) => {
  try {
    const purchases = await PurchaseModel.find({});
    console.log('data fetch Success!')
    return res.status(200).send(purchases);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Requested Id for get single data:', id);
    const purchase = await PurchaseModel.findById(id);
    console.log("getting single data Success from DB")
    return res
      .status(200)
      .send( purchase);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      vendorName,
      date,
      expectedDeliveryDate,
      itemName,
      weight,
      status,
      deliveryAddress,
      description,
    } = req.body;
    const purchase = await PurchaseModel.create({
      vendorName,
      date,
      expectedDeliveryDate,
      itemName,
      weight,
      status,
      deliveryAddress,
      description,
    });

    return res
      .status(200)
      .send({ message: 'Data posted success!', response: purchase });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const _id = req.body._id;
    console.log('Updated Data from frontend:', _id, req.body);
    const update = await PurchaseModel.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    console.log("Updated data:",update);
    return res
      .status(200)
      .send({ message: 'Data updated success!', response: update });
  } catch (error) {
    return res.status(500).send('Put request failed!' + error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    console.log('requested Id:', _id);
    const data = await PurchaseModel.findByIdAndDelete(_id);
    console.log('Removed data:', data);
    return res.status(200).send('Data removed successful!');
  } catch (error) {
    return res.status(500).send('Error in removing data');
  }
});

export default router;
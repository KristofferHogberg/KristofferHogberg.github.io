const MenuItem = require('../model/MenuItem');
const Order = require('../model/Order');
const mongoose = require('mongoose');

const mainWatson = async (req, res) => {
  const request = await req.body.action;
  
  console.log(`This is the request from body: ${request}`);
  switch (request) {
    case 'testgetcall':
      await testGetCall(req, res);
      break;
    case 'findmenuitem':
      await findMenuItem(req, res);
      break;
    case 'saveorder':
      await saveOrder(req, res);
      break;
    default:
      return res.status(400);
  }
};

const postsendAllMenuItems = async (req, res) => {
  console.log('Sendings menuItem to watson');

  let id = mongoose.isValidObjectId(req?.body?.id)
    ? req?.body?.id
    : mongoose.isValidObjectId(req?.query?.id)
    ? req?.query?.id
    : mongoose.isValidObjectId(req?.params?.id)
    ? req?.params?.id
    : null;

  if (id == null) {
    return res.status(400).json({ message: 'ID bad value or missing.' });
  }

  const menuItems = await MenuItem.findOne({ _id: id }).exec();
  console.log('test');
  console.log(id);
  res.setHeader('Content-Type', 'application/json');
  res.json(menuItems);
};

const saveOrder = async (req, res) => {
  console.log('in order');
  if (!req?.body?.username || !req?.body?.sum) {
    return res.status(400).json({ message: 'Username and Sum are required.' });
  }

  try {
    const result = await Order.create({
      username: req.body.username,
      sum: req.body.sum,
    });
    res
      .status(201)
      .json({ message: `Din Order har blivit accepterad!`, success: true });
  } catch (error) {
    res
      .status(400)
      .json({
        message: `Din order har tyvärr inte gått igenom, fösök gärna senar eller kontakta restaurangen`,
        success: false,
      });
    console.error(error);
  }
};

const testGetCall = async (req, res) => {
  testShit = {
    name: 'Kalle',
    dog: 'Lelle'
  };

  console.log(testShit.json());

  res.json(testShit);
};

const findMenuItem = async (req, res) => {
  console.log('Finding menu item...');

  productToFind = req.body.name.toLowerCase();

  if (productToFind === 'carbonara' || productToFind === 'pasta') {
    productToFind = 'pasta carbonara';
  } else if (
    productToFind === 'ost & bacon burgare' ||
    productToFind === 'ost burgare' ||
    productToFind === 'bacon burgare' ||
    productToFind === 'ost & bacon burgare' ||
    productToFind === 'ost & bacon hamburgare'
  ) {
    productToFind = 'ost&bacon burgare';
  } else
    productToFind = productToFind === 'hamburgare' ? 'burgare' : productToFind;

  const product = await MenuItem.findOne({ name: productToFind }).exec();
  console.log(product);

  res.json(product);
};

module.exports = {
  mainWatson,
};

const MenuItem = require('../model/MenuItem');
const Order = require('../model/Order');
const Employee = require('../model/Employee');
const mongoose = require('mongoose');
const { request } = require('express');
const axios = require('axios');

const mainWatson = async (req, res) => {
  const request = await req.body.action;

  console.log(`This is the request from body: ${request}`);
  switch (request) {
    case 'startorder':
      await startOrder(req, res);
      break;
    case 'getallemployees':
      await getAllEmployees(req, res);
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

const startOrder = async (req, res) => {

  console.log('Starting order...');
  let status, data;

  axios.post('http://localhost:8080/engine-rest/process-definition/key/start-instance/start', {});
  // .then(res => {
  //   console.log(`Status: ${res.status}`)
  //   status = res.status;
  //   console.log('Body: ', res.data)
  //   data = res.data;
  // })
  // .catch(err => {
  //   console.error(err)
  // })
  
  // console.log('Starting order...');

  // res.status(status).json(data);
  res.json();
}

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees)
    return res.status(204).json({ message: 'No employees found.' });
  res.json(employees);
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
    res.status(400).json({
      message: `Din order har tyvärr inte gått igenom, fösök gärna senar eller kontakta restaurangen`,
      success: false,
    });
    console.error(error);
  }
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

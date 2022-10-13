const MenuItem = require('../model/MenuItem');
const mongoose = require('mongoose');

const getAllMenuItems = async (req, res) => {
    console.log('Trying to get all menuItems');
    const menuItems = await MenuItem.find();
    if (!menuItems) return res.status(204).json({ "message": 'No menuItems found.' });
    res.json(menuItems);
}

const postMenuItem = async (req, res) => {
    if (!req?.body?.name || !req?.body?.price || !req?.body?.ingredients || !req?.body?.menutype
    ) {
        return res.status(400).json({ "message": "Name, Menu Type, Price and Ingredients are required." });
    }

    try {
        const result = await MenuItem.create({
            name: req.body.name,
            price: req.body.price,
            ingredients: req.body.ingredients,
            menutype: req.body.menutype
        });
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ "message": `Menu Item with name '${req.body.name}' already exists` });
        console.error(error);
    }

}

const deleteMenuItem = async (req, res) => {

    let id = (mongoose.isValidObjectId(req?.body?.id))
        ? req?.body?.id : (mongoose.isValidObjectId(req?.query?.id))
            ? req?.query?.id : mongoose.isValidObjectId(req?.params?.id)
                ? req?.params?.id : null
    if (id === null) {
        return res.status(400).json({ "message": "ID is required." });
    }

    const menuItem = await MenuItem.findOne({ _id: req.body.id }).exec();

    if (!menuItem) {
        return res.status(204).json({ "message": `No menu item with ID: ${req.body.id}` });
    }

    const result = await menuItem.deleteOne({ _id: req.body.id });
    res.json(result);
}

const putMenuItem = async (req, res) => {

    let id = (mongoose.isValidObjectId(req?.body?.id))
        ? req?.body?.id : (mongoose.isValidObjectId(req?.query?.id))
            ? req?.query?.id : mongoose.isValidObjectId(req?.params?.id)
                ? req?.params?.id : null
    if (id === null) {
        return res.status(400).json({ "message": "ID is required." });
    }
    const menuItem = await MenuItem.findOne({ _id: req.body.id }).exec();

    if (!menuItem) {
        return res.status(204).json({ "message": `No menu item with ID: ${req.body.id}` });
    }

    if (req.body?.name) menuItem.name = req.body.name;
    if (req.body?.price) menuItem.price = req.body.price;
    if (req.body?.ingredients) menuItem.ingredients = req.body.ingredients;
    if (req.body?.menutype) menuItem.menutype = req.body.menutype;

    try {
        const result = await menuItem.save();
        res.json(result);
    } catch (error) {
        console.log(error);
    }

}

const getMenuItem = async (req, res) => {


    let id = (mongoose.isValidObjectId(req?.body?.id))
        ? req?.body?.id : (mongoose.isValidObjectId(req?.query?.id))
            ? req?.query?.id : mongoose.isValidObjectId(req?.params?.id)
                ? req?.params?.id : null

    if (id == null) {
        return res.status(400).json({ "message": "ID bad value or missing." });
    }

    console.log(id);
    const menuItem = await MenuItem.findOne({ _id: id }).exec();

    if (!menuItem) {
        return res.status(204).json({ "message": `No menu item with ID: ${id}` });
    }
    res.json(menuItem);
}

module.exports = {
    getAllMenuItems,
    postMenuItem,
    deleteMenuItem,
    putMenuItem,
    getMenuItem
}
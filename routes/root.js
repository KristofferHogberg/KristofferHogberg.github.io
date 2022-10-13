const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname});
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get('^/$|productMenu(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname});
    res.sendFile(path.join(__dirname, '..', 'views', 'productMenu.html'));
});

module.exports = router;
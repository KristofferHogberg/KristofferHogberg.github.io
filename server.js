require('dotenv').config();
const { default: mongoose } = require('mongoose');
const credentials = require('./middleware/credentials');
const verifyAPIKEY = require('./middleware/verifyAPIKEY');
const connectDB = require('./config/dbConn');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8900;

connectDB();

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', require('./routes/root'));

app.use(verifyAPIKEY);

app.use('/employees', require('./routes/api/employees'));
app.use('/menu', require('./routes/api/menu'));
app.use('/watson', require('./routes/api/watson'));

app.all('*', (req, res) => {
    res.status(404).json({ error: '404 Not Found' });
    
});

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

mongoose.connection.once('open', () => {
    console.log('Connected to DB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

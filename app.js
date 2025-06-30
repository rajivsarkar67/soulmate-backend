const express = require('express');
const app = express();
const fs = require('fs');

const data = require('./data.json');
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`app started on port : ${PORT}`);
})

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    // Add the Access-Control-Allow-Headers
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Added Authorization as it's common
    // Optionally, you can also specify allowed methods for preflight requests
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});

app.get('/users/:phoneNumber', (req, res) => {
    console.log(`getting this phone number from the frontend: ${req.params.phoneNumber}`);
    return res.json(data.users.find(elem => elem.phone === req.params.phoneNumber
    ));
})

app.get('/questions', (req,res) => {
    return res.json(data.questions);
})
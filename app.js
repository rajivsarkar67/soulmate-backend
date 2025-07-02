const express = require('express');
const app = express();
const fs = require('fs');

const data = require('./data.json');
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`app started on port : ${PORT}`);
})

app.use(express.json());

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

// to get one users, details
app.get('/users/:phoneNumber', (req, res) => {
    console.log(`getting this phone number from the frontend: ${req.params.phoneNumber}`);
    return res.json(data.users.find(elem => elem.phone === req.params.phoneNumber
    ));
})

// to get questions list
app.get('/questions', (req,res) => {
    return res.json(data.questions);
})

// to save users answer to particular question
app.post('/save', (req, res) => {
    console.log('coming in this saveAnswer API');
    data.users.forEach(elem => {
        if(elem.phone === req.body.phoneNumber){
            elem[req.body.questionId] = req.body.selectedOption;
            elem.currentQuestion = req.body.questionId + 1;
            fs.writeFileSync('./data.json', JSON.stringify(data));
        }
    })
    return res.json(data.users.find(elem => elem.phone === req.body.phoneNumber));
})
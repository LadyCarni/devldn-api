require('dotenv-safe').config();
var FormData = require('form-data');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const validator = require('email-validator');
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.post('/invite', (req, res) => {

    let email = req.body.email;
    if (!email || !validator.validate(email)) {
        res.status(400).send('Please enter a valid email address.');

        return;
    }

    let formData = new FormData();
    formData.append('token', process.env.TOKEN);
    formData.append('email', email);

    fetch('https://devldn.slack.com/api/users.admin.invite', { 
        method: 'POST',
        body: formData,

    })
    .then(res => res.json())
    .then(json => {
        if (!json.ok) {
            res.status(400).send(json)
            return;
        }
        res.send('')
    })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
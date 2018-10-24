require('dotenv-safe').config();

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

    const body = {email, set_active: true, _attempts: 1, token: process.env.TOKEN };

    fetch('https://devldn.slack.com/api/users.admin.invite', { 
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => {
        if (!json.ok) {
            res.status(400).send(json)
            return;
        }
        res.send('')
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
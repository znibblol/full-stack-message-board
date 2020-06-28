const express       = require('express');
const morgan        = require('morgan');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const messages      = require('./db/messages');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({
        message: `Full stack message board!`
    });
});

app.get('/messages', (req, res) => {
    messages.getAll().then((messages) => {
        res.json(messages);
    });
});

const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
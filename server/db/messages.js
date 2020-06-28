const Joi = require('joi');
const db = require('./connection');

// Validation on create
// * username - default to anonymous
// * subject
// * message
// * imageURL
// * created

const schema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    subject: Joi.string().required(),
    message: Joi.string().max(500).required(),
    imageUrl: Joi.string().uri({
        scheme: [
            /https?/
        ]
    }),
});

const messages = db.get('messages')

function getAll() {
    return messages.find();
}

const defaultImage = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.spiritdental.com%2Fcomponents%2Fcom_easyblog%2Fthemes%2Fwireframe%2Fimages%2Fplaceholder-image.png&f=1&nofb=1';

function create(message) {
    if(!message.username) message.username = 'Anonymous';
    if(!message.imageUrl) message.imageUrl = defaultImage;
    const result = Joi.validate(message, schema);
    if(result.error == null) {
        message.created = new Date();
        return messages.insert(message);
    } else {
        return Promise.reject(result.error);
    }
}

module.exports = {
    getAll,
    create
}
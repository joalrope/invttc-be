const {Schema, model} = require('mongoose');


const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['basic', 'freelance', 'storer', 'storer-chief', 'seller', 'admin', 'store-manager', 'owner', 'app-dev' ],
        default: 'basic',
        required: true,
        unique: true
    }
});

module.exports = model ('User', UserSchema);

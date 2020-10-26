const {Schema, model} = require('mongoose');
const { schema } = require('./User');


const SparePartSchema = Schema({
    code: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true

    },
    category: {
        type: String,
        required: true
    },
    equivalent: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
     timestamps: true
});

SparePartSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    const id = _id;
    return {id, ...object}
});


module.exports = model ('SparePart', SparePartSchema);

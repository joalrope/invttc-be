const {Schema, model} = require('mongoose');


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
        type: String
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


module.exports = model ('Parts', SparePartSchema);
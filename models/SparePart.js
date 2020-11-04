const {Schema, model} = require('mongoose');


const SparePartSchema = Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true

    },
    category: {
        type: String,
        required: true
    },
    info: [{
        trademark: {
            type: String,
            required: true
        },
        loc_qty: [{
            location: {
                type: String, 
                required: true
            },
            qty: {
                type: Number,
                required: true
            }
        }],
        costPrice: {
            type: Number,
            required: true
        },
        salePrice: {
            type: Number,
            required: true
        }
    }],
    measurement: {
        type: String
    },
    replacement: [{
        type: String
    }],
    status: {
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


module.exports = model ('SparePart', SparePartSchema);

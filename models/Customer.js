const {Schema, model} = require('mongoose');


const CustomerSchema = Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  isCompany: {
    type: Boolean
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  isClient: {
    type: Boolean,
    default: false
  },
  contact: [{
    contactName: {
      type: String,
      required: function() { return this.isClient; }
    }, 
    contactPhone: {
      type: String,
      required: function() { return this.isClient; }
    },
    contactEmail: {
      type: String,
      required: function() { return this.isClient; }
    }
  }],
  creditLimit: {
    type: Number,
    required: function() { return this.isClient; }
  }
},
{
  timestamps: true
});

CustomerSchema.method('toJSON', function() {
  const {__v, _id, ...object} = this.toObject();
  const id = _id;
  return {id, ...object}
});

module.exports = model ('Customer', CustomerSchema);

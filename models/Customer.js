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
  address: {
    type: String,
    require: true
  },
  phone: {
    type: String
  },
  isClient: {
    type: Boolean,
    default: false
  },
  contact: [{
    name: {
      type: String,
      require: function() { return this.isClient; }
    }, 
    phone: {
      type: String,
      require: function() { return this.isClient; }
    },
    email: {
      type: String,
      require: function() { return this.isClient; }
    }
  }],
  creditLimit: {
    type: Number,
    require: function() { return this.isClient; }
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

const {Schema, model} = require('mongoose');
const {Roles} = require('../helper/roles');


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
    enum: Object.values(Roles),
    default: Roles.Basic,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  }
});

Object.assign(UserSchema.statics, {
  Roles
});

module.exports = model ('User', UserSchema);

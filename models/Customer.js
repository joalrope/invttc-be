const { Schema, model } = require('mongoose');

const CustomerSchema = Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    isCo: {
      type: Boolean,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    contact: [
      {
        contactName: {
          type: String,
          required: function () {
            return this.isClient;
          },
        },
        contactPhone: {
          type: String,
          required: function () {
            return this.isClient;
          },
        },
        contactEmail: {
          type: String,
          required: function () {
            return this.isClient;
          },
        },
      },
    ],
    hasCredit: {
      type: Boolean,
      default: false,
    },
    creditLimit: {
      type: Number,
      required: function () {
        return this.hasCredit;
      },
    },
  },
  {
    timestamps: true,
  }
);

CustomerSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject();
  const id = _id;
  return { id, ...object };
});

module.exports = model('Customer', CustomerSchema);

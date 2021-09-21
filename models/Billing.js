const { Schema, model } = require('mongoose');

const BillingSchema = Schema(
  {
    lastBilling: {
      type: Number,
    },
    taxes: [
      {
        title: {
          type: String,
          required: true,
        },
        rate: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

BillingSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  const id = _id;
  return { id, ...object };
});

module.exports = model('Billing', BillingSchema);

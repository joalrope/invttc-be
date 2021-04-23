const { Schema, model } = require('mongoose');

const InvoiceSchema = Schema(
  {
    lastInvoice: {
      type: Number,
    },
    taxes: [
      {
        title: {
          type: String,
          required: true,
        },
        value: {
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

InvoiceSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  const id = _id;
  return { id, ...object };
});

module.exports = model('Invoice', InvoiceSchema);

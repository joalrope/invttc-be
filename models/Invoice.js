const { Schema, model } = require('mongoose');

const InvoiceSchema = Schema(
  {
    transaction: {
      InvoiceNumber: {},
      date: {},
      customerName: {},
      onCredit: {},
      creditDays: {},
      purchaseTotal: {},
      ivaTax: {},
      ivaTaxAmount: {},
      invoiceTotal: {},
    },
    items: [
      {
        code: {},
        title: {},
        qty: {},
        salePrice: {},
        totalItem: {},
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

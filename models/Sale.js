const { Schema, model } = require('mongoose');

const SaleSchema = Schema(
  {
    invoiceId: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    coin: {
      type: String,
      required: true,
    },
    customer: {
      code: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
    },
    items: [
      {
        code: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        totalItem: {
          type: Number,
          required: true,
        },
        isTaxable: {
          type: Boolean,
          required: true,
          default: true,
        },
      },
    ],
    purchaseTotal: {
      type: Number,
      require: true,
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
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    invoiceTotal: {
      type: Number,
      required: true,
    },
    payment: {
      onCredit: {
        type: Boolean,
        default: false,
        required: true,
      },
      creditDays: {
        type: Number,
        required: function () {
          return this.onCredit;
        },
      },
      isPaid: {
        type: Boolean,
        required: true,
        default: false,
      },
      paymentDate: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

SaleSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  const id = _id;
  return { id, ...object };
});

module.exports = model('Sale', SaleSchema);

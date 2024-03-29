const { Schema, model } = require('mongoose');

const SaleSchema = Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: String,
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
        unique: true,
      },
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      phone: {
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
        trademark: {
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
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

SaleSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject();
  const id = _id;
  const key = _id;
  return { id, key, ...object };
});

module.exports = model('Sale', SaleSchema);

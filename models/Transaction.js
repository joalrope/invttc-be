const { Schema, model } = require('mongoose');

const TransactionSchema = Schema(
  {
    lastTransaction: {
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

TransactionSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  const id = _id;
  return { id, ...object };
});

module.exports = model('Transaction', TransactionSchema);

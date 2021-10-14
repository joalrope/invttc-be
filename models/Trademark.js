const { Schema, model } = require('mongoose');

const TrademarkSchema = Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    factor: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TrademarkSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  const id = _id;
  return { id, ...object };
});

module.exports = model('Trademark', TrademarkSchema);

const { Schema, model } = require('mongoose');

const ProductSchema = Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    details: [
      {
        trademark: {
          type: String,
          required: true,
        },
        stock: [
          {
            location: {
              type: String,
              required: true,
            },
            qty: {
              type: Number,
              required: true,
            },
          },
        ],
        costPrice: {
          type: Number,
          required: true,
        },
        salePrice: {
          type: Number,
          required: true,
        },
      },
    ],
    measurement: {
      type: String,
    },
    replacement: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject();
  const id = _id;
  return { id, ...object };
});

module.exports = model('Product', ProductSchema);

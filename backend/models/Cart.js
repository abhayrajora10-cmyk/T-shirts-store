import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        name: String,
        price: Number,
        discount: Number,
        discountedPrice: Number,
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        size: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
        img: String,
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalDiscount: {
      type: Number,
      default: 0,
    },
    finalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Calculate totals before saving
cartSchema.pre('save', function (next) {
  this.totalPrice = 0;
  this.totalDiscount = 0;
  this.finalPrice = 0;

  this.items.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    const itemDiscount = itemTotal - item.discountedPrice * item.quantity;

    this.totalPrice += itemTotal;
    this.totalDiscount += itemDiscount;
    this.finalPrice += item.discountedPrice * item.quantity;
  });

  next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;

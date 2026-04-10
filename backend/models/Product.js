import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative'],
      max: [100, 'Discount cannot exceed 100%'],
    },
    discountedPrice: {
      type: Number,
      default: function () {
        return this.price - (this.price * this.discount) / 100;
      },
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['Male', 'Female', 'Uni', 'Child', 'Teen', 'Old'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    img: {
      type: String,
      required: [true, 'Please provide an image URL'],
    },
    stock: {
      type: Number,
      default: 100,
      min: [0, 'Stock cannot be negative'],
    },
    sizes: {
      type: [String],
      default: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    },
    colors: {
      type: [String],
      default: ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow'],
    },
    material: {
      type: String,
      default: '100% Cotton',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot exceed 5'],
    },
    reviews: [
      {
        userId: mongoose.Schema.Types.ObjectId,
        username: String,
        rating: Number,
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto calculate discounted price
productSchema.pre('save', function (next) {
  this.discountedPrice = this.price - (this.price * this.discount) / 100;
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;

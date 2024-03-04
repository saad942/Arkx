const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discription: { type: String },
    inStock: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

productSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Product = mongoose.model('tst', productSchema);

module.exports = Product;

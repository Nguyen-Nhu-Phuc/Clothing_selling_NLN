import mongoose from 'mongoose';

const Product = new mongoose.Schema(
    {
        gen: [{ type: String }],
        name: { type: String },
        price: { type: Number },
        Quantity: { type: Number },
        address: { type: String },
        image: {
            id: { type: String },
            url: { type: String }
        },
        priceR: { type: Number },
        discount: { type: Number }
    },

    { timestamps: true },

    { collection: 'Product' }
)

const PictureModel = mongoose.model('Product', Product);

export default PictureModel;
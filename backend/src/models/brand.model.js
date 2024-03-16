import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema(
    {
        nameTH: { type: String, required: true },
        idProduct: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        ]
    },

    { timestamps: true },

    { collection: 'Brand' }
)

const BrandModel = mongoose.model('Brand', BrandSchema);

export default BrandModel;
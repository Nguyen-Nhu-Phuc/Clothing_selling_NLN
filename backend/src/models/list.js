import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema(
    {
        nameDM: { type: String, required: true },
        idProduct: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        ]
    },

    { timestamps: true },

    { collection: 'Categories' }
)

const ListModel = mongoose.model('Categories', ListSchema);

export default ListModel;
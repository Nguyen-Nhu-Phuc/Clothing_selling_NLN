import mongoose from 'mongoose';

const Revenue = new mongoose.Schema(
    {
        revenue: [
            {
                nameProduct: { type: String },
                quantity: { type: Number },
                total_revenue: { type: Number }
            }
        ]
    },

    { timestamps: true },

    { collection: 'Revenue' }
)

const RevenueModel = mongoose.model('Revenue', Revenue);

export default RevenueModel;
import RevenueModel from "../models/revenue.js";

const Revenuecontroller = {
    createRevenue: async (req, res) => {
        try {
            // console.log(req.body);
            // const { nameProduct, quantity, price } = req.body
            const revenue = new RevenueModel(
                // nameProduct: nameProduct,
                // quantity: quantity,
                // total_revenue: price
                // revenue = req.body
            )
            revenue.revenue = req.body
            // console.log(revenue);
            const re = await revenue.save()
            // console.log(re);
            res.status(200).json(re);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    async getAllRevenue(req, res) {
        try {
            const revenue = await RevenueModel.find().populate('revenue')
            res.status(200).json(revenue)
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
};

export default Revenuecontroller;
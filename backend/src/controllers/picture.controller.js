import Product from '../models/Product.js';
import BrandModel from '../models/brand.model.js';
import DanhMucModel from '../models/list.js';
const ProductController = {
    // [POST] /api/Product/add
    addProduct: async (req, res) => {
        try {
            const product = await Product.create(req.body.product)
            console.log(product._id)
            let lists = req.body.listsDM
            let tenDM = req.body.nameDanhMuc
            product.gen = tenDM
            lists.forEach(async (id) => {
                let danhMuc = await DanhMucModel.findById(id)
                danhMuc.idProduct.push(product._id)
                danhMuc.save()
            });
            const TH = await BrandModel.findById(req.body.idTH)
            TH.idProduct.push(product._id)
            TH.save()
            product.save()
            res.status(201).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    updateProduct: async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body.product)
            const product1 = await Product.findById(req.params.id)
            product1.price = req.body.gia
            product1.save()
            res.status(200).json(product);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },

    // async updatedQuantity(req, res) {
    //     try {
    //         // console.log(req.body);
    //         for (let index = 0; index < req.body.length; index++) {
    //             const pd = await Product.findById(req.body[index]._id)
    //             const SL = await pd.Quantity
    //             console.log(req.body[index].quantity);
    //             console.log(pd.Quantity);
    //             const sum = await SL - req.body[index].quatity
    //             pd.Quantity = sum
    //             console.log(sum);
    //             // pd.save()
    //             // res.status(200).json(pd)
    //         }
    //     }
    //     catch (err) {
    //         res.status(500).json(err)
    //     }
    // },

    async updatedQuantity(req, res) {
        try {
            const updatePromises = req.body.map(async (productData) => {
                const pd = await Product.findById(productData._id);
                if (!pd) {
                    throw new Error(`Product not found with id ${productData._id}`);
                }

                const currentQuantity = pd.Quantity;
                const updatedQuantity = currentQuantity - productData.quantity;

                if (updatedQuantity < 0) {
                    throw new Error(`Insufficient quantity for product with id ${productData._id}`);
                }

                pd.Quantity = updatedQuantity;
                await pd.save();
                return pd;
            });

            const updatedProducts = await Promise.all(updatePromises);

            res.status(200).json(updatedProducts);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    },


    // [DELETE] /api/Product
    deleteProduct: async (req, res) => {
        try {
            console.log(req.params.id);
            await Product.findByIdAndDelete(req.params.id);

            res.status(200).send('Delete!!!');
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //[GET] /api/cousre/storedzz
    getAllProduct: async (req, res) => {
        try {
            const all = await Product.find({});
            return res.status(200).json(all);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getOneProduct(req, res) {
        try {
            const product = await Product.findById(req.params.id)
            res.status(200).json(product)
        }
        catch (err) {

        }
    },

};

export default ProductController;
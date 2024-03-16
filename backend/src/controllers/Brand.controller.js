import BrandModel from '../models/brand.model.js'; // Đảm bảo bạn đã import DanhMucModel từ tệp DanhMucModel.js
import PictureModel from '../models/Product.js';
// Hàm tạo danh mục sản phẩm mới
const BrandController = {
    addBrand: async (req, res) => {
        try {

            const brand = await BrandModel.findOne({ nameTH: req.body.product.nameTH })
            if (!brand) {
                const newBrand = await BrandModelModel.create(req.body.product);
                res.status(201).json(newBrand);
            }
            else {
                return res.status(400).json({
                    mes: 'Đã tồn tại thương hiệu này'
                })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateBrand: async (req, res) => {
        try {
            const brand = await BrandModelfindOneAndUpdate({ _id: req.params.id }, req.body)
            res.status(200).json(brand);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    deleteBrand: async (req, res) => {
        try {
            const TH = await BrandModel.findById(req.params.id)
            for (let index = 0; index < TH.idProduct.length; index++) {
                console.log(TH.idProduct[index]);
                await PictureModel.findByIdAndDelete(TH.idProduct[index])
            }
            const brand = await BrandModel.findByIdAndDelete(req.params.id);
            res.status(200).json(brand);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllBrand: async (req, res) => {
        try {
            const all = await BrandModel.find();
            return res.status(200).json(all);
        } catch (err) {
            res.status(500).json(err);
        }
    }

}
export default BrandController;
import ListModel from '../models/list.js'; // Đảm bảo bạn đã import ListModel từ tệp ListModel.js

// Hàm tạo danh mục sản phẩm mới
const ListController = {
    addList: async (req, res) => {
        try {
            const list = await ListModel.findOne({ nameDM: req.body.product.nameDM })
            if (list) {
                return res.status(400).json({
                    mes: 'Đã tồn tại thương hiệu này'
                })
            }
            const danhmuc = await ListModel.create(req.body.product)
            res.status(201).json(danhmuc);
        } catch (error) {
            res.status(500).json(err);
        }
    },

    updateList: async (req, res) => {
        try {
            const list = await ListModel.findOneAndUpdate({ _id: req.params.id }, req.body)
            res.status(200).json(list);
        }
        catch (err) {
            res.status(500).json(err)
        }
    },
    deleteList: async (req, res) => {
        try {
            const list = await ListModel.findByIdAndDelete(req.params.id);
            res.status(200).json(list);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllList: async (req, res) => {
        try {
            const all = await ListModel.find();
            return res.status(200).json(all);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

}
export default ListController;
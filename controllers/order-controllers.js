import ctrlWrapper from '../helpers/ctrlWrapper.js';
import Order from '../service/schemas/orderSchemas.js';

const addOrder = async (req, res) => {
    try {
        const newOrder = await Order.create({
            ...req.body,
        });
        res.status(201).json({
            newOrder,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const allorders = async (req, res) => {
    const { page = 1, limit = 5, name = '', sortBy = 'order_date', order = 'desc' } = req.query;
    const skip = (page - 1) * limit;
    const sortOptions = {};
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;

    try {
        const query = {};
        if (name) {
            query.name = new RegExp(name, 'i');
        }

        const [data, count] = await Promise.all([
            Order.find(query, "-createdAt -updatedAt", { skip, limit }).sort(sortOptions).exec(),
            Order.countDocuments(query).exec()
        ]);

        if (data.length > 0) {
            return res.json({ data, count });
        } else {
            return res.status(404).json("The list is empty");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server error");
    }
}


const orderControllers = {
    addOrder: ctrlWrapper(addOrder),
    allorders: ctrlWrapper(allorders),
};

export default orderControllers;
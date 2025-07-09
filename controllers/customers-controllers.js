import Customer from '../service/schemas/customerSchemas.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';

const registerCustomer = async (req, res) => {
    const newCustomer = await Customer.create({
        ...req.body,
    });
    res.status(201).json({
        newCustomer,
    });
}

const allcustomers = async (req, res) => {
    const { page = 1, limit = 5, name = '', sortBy = 'register_date', order = 'desc' } = req.query;
    const skip = (page - 1) * limit;
    const sortOptions = {};
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;

    try {
        let data = await Customer.find({}, "-createdAt -updatedAt", { skip, limit }).sort(sortOptions).exec();

        if (name) {
            const query = {};
            query.name = new RegExp(name, 'i');
            data = await Customer.find(query, "-createdAt -updatedAt", { skip, limit }).sort(sortOptions).exec();
        }

        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.status(404).json("The list is empty");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server error");
    }
}

const customerInfo = async (req, res) => {
    const { customerId } = req.params;
    const data = await Customer.findById(customerId);
    if (!data) {
        throw HttpError(404,"Not Found")
    }
    res.json(data);
}

const customerControllers = {
    registerCustomer: ctrlWrapper(registerCustomer),
    allcustomers: ctrlWrapper(allcustomers),
    customerInfo: ctrlWrapper(customerInfo),
};

export default customerControllers;
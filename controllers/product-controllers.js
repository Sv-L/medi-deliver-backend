import ctrlWrapper from '../helpers/ctrlWrapper.js';
import Product from '../service/schemas/productSchemas.js';
import HttpError from '../helpers/HttpError.js';

const addProduct = async (req, res) => {
    try {
        const newProduct = await Product.create({
            ...req.body,
        });
        res.status(201).json({
            newProduct,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const allProducts = async (req, res) => {
    const { page = 1, limit = 5, name = '', sortBy = 'name', order = 'asc' } = req.query;
    const skip = (page - 1) * limit;
    const sortOptions = {};
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;

    try {
        const query = {};
        if (name) {
            query.name = new RegExp(name, 'i');
        }

        const [data, count] = await Promise.all([
            Product.find(query, "-createdAt -updatedAt", { skip, limit }).sort(sortOptions).exec(),
            Product.countDocuments(query).exec()
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

const deleteProduct = async (req, res, next) => {
  const { productId } = req.params;

  const data = await Product.findOneAndDelete({ _id: productId });
  if (!data) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.json({ message: 'Product deleted', id: productId });
};

const updateProduct = async (req, res, next) => {
 const { productId } = req.params;
    const data = await Product.findOneAndUpdate({ "_id": productId }, req.body, {new: true })
     if (!data) {
      throw HttpError(404,"Not Found")
    }
    res.json(data)
}

const productsControllers = {
    addProduct: ctrlWrapper(addProduct),
    allProducts: ctrlWrapper(allProducts),
    deleteProduct: ctrlWrapper(deleteProduct),
    updateProduct: ctrlWrapper(updateProduct),
};

export default productsControllers;
const { connect } = require("mongoose")
require('dotenv').config()
const Products = require('./model')

const getProducts = async (req, res) => {
    try {
        await connect(process.env.MONGO_URI)

        const sortBy = req.query.sortBy || 'category'; // Default to sorting by category
        const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;

        const products = await Products.find().sort({ [sortBy]: sortOrder });
        res.json({ products });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const postProducts = async (req, res) => {
    const { productName, thumbnail, description, price, category, BrandName, images, onSale, salesCount, rating } = req.body
    if (!productName || !thumbnail || !description || !price || !category || !BrandName || !images || onSale || salesCount || rating) {
        res.status(400).json({ message: 'Invalid Payload' })
    }

    else {
        try {
            await connect(process.env.MONGO_URI)
            const checkExisting = await Products.exists({ productName })
            if (checkExisting) {
                res.status(403).json({ message: "Product Already Exists" })
            }
            else {
                await Products.create({ productName, thumbnail, description, price, category, BrandName, images })
                const products = await Products.find()
                res.status(201).json({
                    message: "Product Created Successfully",
                    products
                })
            }

        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }

}

const ProductbyCategory = async (req, res) => {
    const { category } = req.params
    if (!category) {
        res.status(403).json({ message: "Please Give category" })
    }
    else {
        await connect(process.env.MONGO_URI)
        const products = await Products.find({ category })
        res.json({ products })
    }
}

const ProductbyBrandName = async (req, res) => {
    const { BrandName } = req.params
    if (!BrandName) {
        res.status(403).json({ message: "Please Give Category Name" })
    }
    else {
        await connect(process.env.MONGO_URI)
        const products = await Products.find({ BrandName })
        res.json({ products })
    }
}

const ProductbyId = async (req, res) => {
    const { _id } = req.params
    if (!_id) {
        res.status(403).json({ message: "Please Give Product id" })
    }
    else {
        await connect(process.env.MONGO_URI)
        const products = await Products.findOne({ _id })
        res.json({ products })
    }
}


const getOnSaleProducts = async (req, res) => {
    try {
        await connect(process.env.MONGO_URI);

        const onSaleProducts = await Products.find({ onSale: true });

        res.json({ onSaleProducts });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const markProductOnSale = async (req, res) => {
    const { _id } = req.params;

    try {
        await connect(process.env.MONGO_URI);

        const product = await Products.findById(_id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.onSale = true;
        await product.save();

        res.json({ message: 'Product marked as on sale' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getBestSellers = async (req, res) => {
    try {
        await connect(process.env.MONGO_URI);

        // Query for best-selling products based on salesCount
        const bestSellers = await Products.find()
            .sort({ rating: -1 })  // Sort in descending order based on salesCount
            .limit(10);  // Fetch the top 10 best sellers (you can adjust this number)

        res.json({ bestSellers });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// const getBestSellers = async (req, res) => {
//     try {
//         await connect(process.env.MONGO_URI);



//         // Query for best-selling products with ratings higher than 2.5
//         const bestSellers = await Products.find({ rating: { $gt: 2.5 } })
//             .sort({ rating: -1 })  // Sort in descending order based on rating
//             .limit(10);  // Fetch the top 10 products (you can adjust this number)

//         res.json({ bestSellers });
//         console.log({ bestSellers })
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// const getBestSellers = async (req, res) => {
//     try {
//         await connect(process.env.MONGO_URI);

//         // Construct a query object to find best-selling products with ratings higher than 2.5
//         const bestSellers = await Products.find({ rating: { $gt: 2.5 } })
//             .sort({ rating: -1 })  // Sort in descending order based on rating
//             .limit(10);  // Fetch the top 10 products (you can adjust this number)

//         res.json({ bestSellers });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

const getBestSellersById = async (req, res) => {
    const productId = req.params._id; // Get the product ID from the URL parameter

    try {
        await connect(process.env.MONGO_URI);

        const bestSellersData = await Products.findOne({ _id: productId });
        res.json({ bestSellersData });

        // Return the best sellers data as a response
        // res.status(200).json(bestSellersData);
    } catch (error) {


        //     // For example, you can use a database query or an API call
        //     const bestSellersData = await Products.findOne({ _id: productId });
        //     res.json({ bestSellersData })

        //     // Return the best sellers data as a response
        //     res.status(200).json(bestSellersData);





        // } catch (error) {
        console.error('Error fetching best sellers data:', error);
        res.status(500).json({ error: 'An error occurred while fetching best sellers data' });
    }
};



const getProductCategories = async (req, res) => {
    try {
        await connect(process.env.MONGO_URI);
        console.log("DB Connected in get ProductCategories")

        const categoriesWithImages = await Products.aggregate([
            {
                $group: {
                    _id: "$category",
                    thumbnail: { $first: "$images" }
                }
            },
            {
                $sort: { _id: 1 } // Sort by category name in ascending order (A-Z)
            }
        ]);

        res.json({ categoriesWithImages });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const rateProduct = async (req, res) => {
    const { _id, user, rating, review } = req.body;

    try {
        await connect(process.env.MONGO_URI);

        const product = await Products.findById(_id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if the user has already rated the product
        const existingRating = product.rating.find(r => r.user.equals(user));
        if (existingRating) {
            return res.status(400).json({ message: 'You have already rated this product' });
        }

        // Add the new rating to the product's ratings array
        product.rating.push({ user, rating, review });

        // Update the average rating of the product
        const totalRatings = product.rating.length;
        const sumOfRatings = product.rating.reduce((sum, r) => sum + r.rating, 0);
        product.averageRating = sumOfRatings / totalRatings;

        await product.save();

        res.json({ message: 'Rating added successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getHighRatedProducts = async (req, res) => {
    try {
        await connect(process.env.MONGO_URI);

        // Query for products with ratings higher than 4.0
        const highRatedProducts = await Products.find({ rating: { $gt: 4.0 } })
            .sort({ rating: -1 })  // Sort in descending order based on rating
            .limit(10);  // Fetch the top 10 high-rated products (you can adjust this number)

        res.json({ highRatedProducts });
        console.log({ highRatedProducts });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = { getProducts, rateProduct, postProducts, ProductbyCategory, ProductbyBrandName, ProductbyId, getBestSellers, getOnSaleProducts, markProductOnSale, getBestSellers, getProductCategories, getBestSellersById, getHighRatedProducts }

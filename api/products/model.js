const { Schema, model } = require('mongoose')

const ProductSchema = new Schema(
    {
        productName: {
            type: String,
            required: true,
            unique: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },


        category: {
            type: String,
            required: true
        },
        BrandName: {
            type: String,
            required: true
        },
        images: {
            type: Array,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        },
        rating: [
            {
                users: { type: Schema.Types.ObjectId, ref: 'User' },
                rating: { type: Number },
                review: { type: String }
            }
        ],

        salesCount: {
            type: Number,
            default: 0  // Initialize sales count to 0
        },

        onSale: {
            type: Boolean,
            default: false  // Initialize onSale status to false
        }


    }
)

const Products = model('product', ProductSchema)
module.exports = Products
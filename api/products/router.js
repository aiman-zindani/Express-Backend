const app = require('express')
const router = app.Router()
const { getProducts, postProducts, rateProduct, getBestSellersById, getHighRatedProducts, ProductbyCategory, ProductbyBrandName, ProductbyId, getOnSaleProducts, markProductOnSale, getBestSellers, getProductCategories } = require('./controller')

router.get('/get-all-products', getProducts)
// http://localhost:1234/api/get-all-products?sortBy=category&sortOrder=asc  for ascending sort a-z

router.post('/rate-product', rateProduct);

router.get('/get-product-by-id/:_id', ProductbyId)
router.get('/getproductbyBrandName/:BrandName', ProductbyBrandName)


router.get('/categories', getProductCategories);

router.get('/get-product-by-category/:category', ProductbyCategory)
router.post('/add-products', postProducts)

router.get('/get-best-sellers', getBestSellers);
router.get('/get-best-sellers/:_id', getBestSellersById);

router.get('/get-high-rated-products', getHighRatedProducts);

router.get('/get-on-sale-products', getOnSaleProducts);
router.put('/mark-product-on-sale/:_id', markProductOnSale);

module.exports = router;

const app = require('express')
const router = app.Router()

const { AddBrand, getAllBrands, brandByID, updateBrand, deleteBrand } = require('./controller')


router.post('/add-brand', AddBrand)
router.get('/brandbyid', brandByID)
router.get('/brands', getAllBrands)
router.put('/update-brand', updateBrand)
router.delete('/delete-brand', deleteBrand)

module.exports = router

// // .......................
// const app = require('express')
// const router = app.Router()

// const { SignUp, Dummy, Login, allUsers, getUserbyEmail, userbyEmail } = require('./controller')


// router.post('/brand', Dummy)
// router.post('/signup', SignUp)
// router.post('/login', Login)
// router.get('/getallusers', allUsers)
// router.get('/userbyemail/:email', getUserbyEmail)
// router.get('/getuserbyemail', userbyEmail) // this is done using query params




// module.exports = router
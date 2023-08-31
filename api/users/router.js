// const express = require('express')
// const router = express.Router()
// const UserController = require('./Controller');
// const { signup } = require('./Controller')
// // copied from routes.User.js

// // const express = require('express');

// // Define your routes here
// router.get('/', (req, res) => {
//   res.send('Hello from user router!');
// });


// // Middleware to check if the email already exists
// router.post('/signup', UserController.checkExisting, UserController.signupUser);

// router.post('/login', UserController.loginUser);
// router.get('/users', UserController.getAllUsers);
// router.get('/users/:id', UserController.getUserById);
// router.delete('/users/:id', UserController.deleteUser);
// router.put('/users/:id', UserController.updateUser);

// copied from routes.User.js
// router.post('/users', Dummy)
// router.post('/signup', signup)
// router.post('/login', Login)
// router.get('/getallusers', allUsers)
// router.get('/userbyemail/:email', getUserbyEmail)
// router.get('/getuserbyemail', userbyEmail) // this is done using query params
// router.delete('/delete-user', deleteuser)









// module.exports = router;






// module.exports = router;





// const app = require('express')
// const router = app.Router()

// const { SignUp, Dummy, Login, allUsers, getUserbyEmail, userbyEmail } = require('./controller')






// module.exports = router

// ...........................................................................

const app = require('express')
const router = app.Router()

const { SignUp, Dummy, Login, allUsers, getUserbyEmail, userbyEmail } = require('./controller')


router.post('/brand', Dummy)
router.post('/signup', SignUp)
router.post('/login', Login)
router.get('/getallusers', allUsers)
router.get('/userbyemail/:email', getUserbyEmail)
router.get('/getuserbyemail', userbyEmail) // this is done using query params




module.exports = router
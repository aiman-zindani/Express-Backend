// const { connect } = require('mongoose')
// require('dotenv').config()
// const user = require('./model')
// // const port = process.env.SERVER_PORT

// const signup = async (req, res) => {
//     const { username, password, email } = req.body;


//     try {
//         await connect(process.env.MONGO_URI);
//         // const checkExisting = await User.exists({ email: email })
//         res.json({
//             message: "mongo db connected"
//         })

//         if (checkExisting) {
//             res.json({
//                 message: "user already exist, try to signup with diffrent email"
//             })
//         }
//         else {

//             await User.create({ username, password, email })
//             res.json({
//                 message: "user created"
//             })
//         }

//     }

//     catch (error) {
//         res.json({
//             message: error.message

//         })


//     }
// }

// below code is copied from chatgpt

// const UserController = {
//     Dummy: (req, res) => {
//       // Implementation for Dummy route
//     },
//     SignUp: (req, res) => {
//       // Implementation for SignUp route
//     },
//     Login: (req, res) => {
//       // Implementation for Login route
//     },
//     // ... other functions ...
//   };

//   module.exports = UserController;



// const login = (req,res) => {
//     const { username, password, email } = req.body;
//     res.json({
//         message: "Done"
//     })

// }
// module.exports = {
//     signup,
//     // login 
// }






// ............................................................

const mongoose = require('mongoose')
require('dotenv').config()
const User = require('./schema')
const { hash, compare } = require('bcryptjs')

const { sign } = require('jsonwebtoken')


const Dummy = (req, res) => {
    res.json({
        user: "BQ " + req.body.user
    })
}

const SignUp = async (req, res) => {
    const { username, password, email, address, city, state, zip
    } = req.body;
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connected in signup")
        const existingUser = await User.exists({ email: email })
        if (existingUser) {
            res.status(208).json({
                message: "User Already Exists"
            })
        }

        else if (!existingUser) {

            await User.create({
                username, email, password: await hash(password, 12), address,
                city,
                state,
                zip,
            })
            console.log("User Created")
            res.status(201).json({
                message: "Signup Successfully"
            })
        }
    }
    catch (error) {
        res.json({
            message: error.message
        })
    }
}


const Login = async (req, res) => {

    const { password, email } = req.body;

    try {
        await mongoose.connect(process.env.MONGO_URI)
        const existingUser = await User.findOne({ email: email })

        if (!existingUser) {
            res.status(404).json({
                message: "User not found"
            })
        }

        else {

            const decryptPassword = await compare(password, existingUser.password)
            if (email == existingUser.email && decryptPassword) {
                const token = sign(
                    {
                        id: existingUser._id,
                        username: existingUser.username,
                        email: existingUser.email,
                        profile: existingUser.profile,
                        role: existingUser.role
                    }
                    ,
                    process.env.JWT_SECRET
                )

                res.json({
                    message: "Successfully Loggined",
                    token: token
                })
            }
            else {
                res.json({
                    message: "invalid Credentials"
                })
            }
        }

    }
    catch (error) {
        res.json({
            message: error.message
        })

    }
}

const allUsers = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        const Users = await User.find()
        res.json(
            {
                Users: Users
            }
        )

    }

    catch (error) {
        res.json(
            {
                message: error.message
            }
        )

    }
}


const getUserbyEmail = async (req, res) => {

    const { email } = req.params


    try {
        await mongoose.connect(process.env.MONGO_URI)
        const Users = await User.findOne({ email: email })
        res.json(
            {
                Users: Users
            }
        )

    }

    catch (error) {
        res.json(
            {
                message: error.message
            }
        )

    }
}

const userbyEmail = async (req, res) => {

    const { email } = req.query


    try {
        await mongoose.connect(process.env.MONGO_URI)
        const Users = await User.findOne({ email: email })
        res.json(
            {
                Users: Users
            }
        )

    }

    catch (error) {
        res.json(
            {
                message: error.message
            }
        )

    }
}



module.exports = { Dummy, SignUp, Login, allUsers, getUserbyEmail, userbyEmail }






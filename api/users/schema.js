// const { Schema, model } = require('mongoose');

// const UserSchema = new Schema(
//     {

//         username: {
//             type: String,
//             required: true
//         },

//         email: {
//             type: String,
//             required: true,
//             unique: true
//         },

//         password: {
//             type: String,
//             required: true,
//         },
//         joining: {
//             type: Date,
//             default: Date.now
//         }
//     }
// )
// const user = model('user', UserSchema)
// module.export = user;

// ..................................................

const { Schema, model } = require('mongoose')


const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        role: {
            type: String,
            required: true,
            default: "user"
        },

        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        },
        profile: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
        },
        joining: {
            type: Date,
            default: Date.now
        }

    }
)


const User = model('user', UserSchema)
module.exports = User;
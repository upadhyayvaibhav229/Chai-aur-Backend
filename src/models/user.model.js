import mongoose, { Schema } from "mongoose";
import jwt from 'json-web-token'
import bcrypt from "bcrypt"
const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },

    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,

    },
    fullname: {
        type: String,
        require: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String, //cloudinary url
        require: true,

    },

    coverImage: {
        type: String, //cloudinary url
    },
    watchHistroy: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    password: {
        type: String,
        required: [true, 'Password is required']
    }

}, {
    timestamps: true,
});
// password encryption
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expireIN: process.env.ACCESS_TOKEN_EXPRIY
        }
    )
}
userSchema.methods.generateRefreshToken = function () { 
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expireIN: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model(("User", userSchema))
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: String, 
    password: String,
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },

    refreshTokens: String,
    resetToken: String,
    resetTokenExpiry: Number

});
export default mongoose.model("User", userSchema);
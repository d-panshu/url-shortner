import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortId: { type: String, required: true, unique: true },
    originalURL: String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    clicks:{
        type:Number,
        default:0
    },
    expiryDate: Date
});
export default mongoose.model("URL", urlSchema);
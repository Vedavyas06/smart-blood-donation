import mongoose from "mongoose"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    location: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    licenseNumber: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String,
        default:null
    }
}, {
    timestamps: true
});
hospitalSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});
hospitalSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
hospitalSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}
const Hospital = mongoose.model("Hospital", hospitalSchema);

export {Hospital};

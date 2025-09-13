import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const donorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    token:{
        type: String
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
donorSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});
donorSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
donorSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}
const Donor = mongoose.model('Donor', donorSchema);

export { Donor };

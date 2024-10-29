import mongoose, { Document, Schema, model } from 'mongoose';

// User interface
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone:string;
    usertype: 'buyer' | 'seller'; // Define specific types
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    usertype: {
        type: String,
        required: true,
        enum: ['buyer', 'seller'], // Restrict to "buyers" or "sellers"
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) { 
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    }
});

const UserModel = model<IUser>('User', userSchema);

export default UserModel;

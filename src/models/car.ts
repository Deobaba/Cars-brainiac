import mongoose, { Document, Schema, model, Types } from 'mongoose';

// Car interface
export interface ICar extends Document {
    make: string;
    year: number;
    mileage: string;
    price: number;
    description: string;
    availability: boolean;
    sellerId: Types.ObjectId;  // Reference to seller model
    createdAt?: Date;
    updatedAt?: Date;
}

const CarSchema = new Schema<ICar>({
    make: { type: String, required: true },
    year: { type: Number, required: true },
    mileage: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    availability: { type: Boolean, required: true },
    sellerId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',  // Reference to the User model
        required: true 
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

const CarModel = model<ICar>('Car', CarSchema);

export default CarModel;

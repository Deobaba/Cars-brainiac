import mongoose, { Document, Schema, model , Types } from 'mongoose';

// Car interface
export interface ICar extends Document {
    make: string;
    year: number;
    carModel: string;  // Renamed here to avoid conflicts
    mileage: number;
    price: number;
    description: string;
    pictures: string[];
    availability: boolean;
    sellerId: Types.ObjectId;  // Reference to seller model
    createdAt?: Date;
    updatedAt?: Date;
}

const CarSchema = new Schema<ICar>({
    make: { type: String, required: true },
    year: { type: Number, required: true },
    carModel: { type: String, required: true, alias: 'model' },  // Alias for 'model'
    mileage: { type: Number, required: true },
    price: { type: Number, required: true },
    pictures: [{ type: String, default: [] }],
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
            ret.model = ret.carModel;  // Ensure it outputs as 'model' in JSON
            delete ret.carModel;
        }
    }
});

// Middleware to ensure fields are lowercase before saving
CarSchema.pre('save', function (next) {
    this.make = this.make.toLowerCase();
    this.carModel = this.carModel.toLowerCase();  // Apply lowercase to carModel
    next();
});

const CarModel = model<ICar>('Car', CarSchema);

export default CarModel;

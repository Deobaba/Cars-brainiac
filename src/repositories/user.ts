import {Types} from 'mongoose';
import UserModel from '../models/user';
import {IUser} from '../models/user';
import ErrorResponse from '../utils/errorResponse';


export class UserRepository {

    static async createUser(user: IUser): Promise<IUser> {
        try {
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        } catch (err: any) {
            throw new ErrorResponse(err.message, 500);
        }
    }

    static async getAllUsers(): Promise<IUser[] | []> {
        try {
            const users = await UserModel.find();
            return users;
        } catch (err: any) {
            throw new ErrorResponse(err.message, 500);
        }
    }

    static async getUserById(id: string): Promise<IUser> {
        if (!Types.ObjectId.isValid(id)) {
            throw new ErrorResponse('Invalid user ID', 400);
        }
        const user = await UserModel.findById(id);
        if (!user) {
            throw new ErrorResponse('User not found', 404);
        }
        return user;
    }

    static async getUserByEmail (email: string): Promise<IUser> {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw new ErrorResponse(`User with ${email} not found`, 404);
        }
        return user;
    }

    static async checkUserExist(email: string): Promise<IUser|null> {
        try{
            const user = await UserModel.findOne({email})
            console.log(user)
            return user
        }catch(err:any){
            throw new ErrorResponse(err.message, 500);
        }

    }

    static async updateUser(id: string, user: IUser): Promise<IUser> {
        if (!Types.ObjectId.isValid(id)) {
            throw new ErrorResponse('Invalid user ID', 400);
        }
        const updatedUser = await UserModel.findByIdAndUpdate(id, user, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            throw new ErrorResponse('User not found', 404);
        }
        return updatedUser;
    }

    static async deleteUser(id: string): Promise<IUser> {
        if (!Types.ObjectId.isValid(id)) {
            throw new ErrorResponse('Invalid user ID', 400);
        }
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new ErrorResponse('User not found', 404);
        }
        return deletedUser;
    }
}
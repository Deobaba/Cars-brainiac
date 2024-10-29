import { UserRepository } from "../repositories/user";
import { IUser } from "../models/user";
import ErrorResponse from "../utils/errorResponse";



export class UserService {

    // create new user
    static async createUser(user: IUser): Promise<IUser> {
        try {
            return await UserRepository.createUser(user);
        } catch (err: any) {
            throw new ErrorResponse(err.message, 404);
        }
    }

    // get all users
    static async getAllUsers(): Promise<IUser[] | []> {
        try {
            return await UserRepository.getAllUsers();
        } catch (err: any) {
            throw new ErrorResponse(err.message, 404);
        }

    }

    // get user by id
    static async getUserById(id: string): Promise<IUser> {
        try {
            return await UserRepository.getUserById(id);
        } catch (err: any) {
            throw new ErrorResponse(err.message, 404);
        }
    }

    static async getUserByEmail(email: string): Promise<IUser> {
        try {
            return await UserRepository.getUserByEmail(email);
        } catch (err: any) {
            throw new ErrorResponse(err.message, 404);
        }
    }

    static async checkUserExist(email: string): Promise<IUser | null> {
        try {
            console.log(email)
            return await UserRepository.checkUserExist(email);
        } catch (err: any) {
            throw new ErrorResponse(err.message, 404);
        }
    }

    // update user
    static async updateUser(id: string, user: IUser): Promise<IUser> {
        try {
            return await UserRepository.updateUser(id, user);
        } catch (err: any) {
            throw new ErrorResponse(err.message, 404);
        }
    }

    // delete user
    static async deleteUser(id: string): Promise<IUser> {
        try {
            return await UserRepository.deleteUser(id);
        } catch (err: any) {
            throw new ErrorResponse(err.message, 404);
        }
    }

}
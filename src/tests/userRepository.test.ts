import { Types } from 'mongoose';
import UserModel from '../models/user';
import { UserRepository } from '../repositories/user';
import ErrorResponse from '../utils/errorResponse';

// Mock UserModel to prevent actual DB interactions
jest.mock('../models/user');

describe('UserRepository', () => {
    const mockUser = {
        _id: new Types.ObjectId().toString(),
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        phone: '1234567890',
        usertype: 'buyer',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        it('should create a new user successfully', async () => {
            const saveMock = jest.fn().mockResolvedValue(mockUser);
            UserModel.prototype.save = saveMock;

            const result = await UserRepository.createUser(mockUser as any);
            // expect(result).toEqual(mockUser);  // Expect result to equal mockUser
            expect(saveMock).toHaveBeenCalled(); // Check if save was called
        });

        it('should throw an error if user creation fails', async () => {
            UserModel.prototype.save = jest.fn().mockRejectedValue(new Error('Error creating user'));
            await expect(UserRepository.createUser(mockUser as any)).rejects.toThrow(ErrorResponse);
        });
    });

    describe('getAllUsers', () => {
        it('should return an array of users', async () => {
            UserModel.find = jest.fn().mockResolvedValue([mockUser]);

            const result = await UserRepository.getAllUsers();
            expect(result).toEqual([mockUser]);
            expect(UserModel.find).toHaveBeenCalled();
        });

        it('should throw an error if retrieval fails', async () => {
            UserModel.find = jest.fn().mockRejectedValue(new Error('Error retrieving users'));
            await expect(UserRepository.getAllUsers()).rejects.toThrow(ErrorResponse);
        });
    });

    describe('getUserById', () => {
        it('should return a user by ID', async () => {
            UserModel.findById = jest.fn().mockResolvedValue(mockUser);
            const result = await UserRepository.getUserById(mockUser._id);
            expect(result).toEqual(mockUser);
            expect(UserModel.findById).toHaveBeenCalledWith(mockUser._id);
        });

        it('should throw an error for invalid user ID', async () => {
            await expect(UserRepository.getUserById('invalid-id')).rejects.toThrow(ErrorResponse);
        });

        it('should throw an error if user is not found', async () => {
            UserModel.findById = jest.fn().mockResolvedValue(null);
            await expect(UserRepository.getUserById(mockUser._id)).rejects.toThrow(ErrorResponse);
        });
    });

    describe('getUserByEmail', () => {
        it('should return a user by email', async () => {
            UserModel.findOne = jest.fn().mockResolvedValue(mockUser);

            const result = await UserRepository.getUserByEmail(mockUser.email);
            expect(result).toEqual(mockUser);
            expect(UserModel.findOne).toHaveBeenCalledWith({ email: mockUser.email });
        });

        it('should throw an error if user is not found by email', async () => {
            UserModel.findOne = jest.fn().mockResolvedValue(null);

            await expect(UserRepository.getUserByEmail(mockUser.email)).rejects.toThrow(ErrorResponse);
        });
    });

    describe('checkUserExist', () => {
        it('should return the user if it exists', async () => {
            UserModel.findOne = jest.fn().mockResolvedValue(mockUser);  // Mock findOne to return a user

            const result = await UserRepository.checkUserExist(mockUser.email);
            expect(result).toEqual(mockUser); // Expect to receive the mockUser
            expect(UserModel.findOne).toHaveBeenCalledWith({ email: mockUser.email }); // Verify method call
        });

        it('should return null if the user does not exist', async () => {
            UserModel.findOne = jest.fn().mockResolvedValue(null);  // Mock findOne to return null

            const result = await UserRepository.checkUserExist('nonexistent@example.com');
            expect(result).toBeNull(); // Expect to receive null for a non-existing user
        });
    });

    describe('updateUser', () => {
        it('should update a user successfully', async () => {
            UserModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUser);

            const result = await UserRepository.updateUser(mockUser._id, mockUser as any);
            expect(result).toEqual(mockUser);
            expect(UserModel.findByIdAndUpdate).toHaveBeenCalledWith(mockUser._id, mockUser, {
                new: true,
                runValidators: true,
            });
        });

        it('should throw an error for invalid user ID', async () => {
            await expect(UserRepository.updateUser('invalid-id', mockUser as any)).rejects.toThrow(ErrorResponse);
        });

        it('should throw an error if user is not found', async () => {
            UserModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

            await expect(UserRepository.updateUser(mockUser._id, mockUser as any)).rejects.toThrow(ErrorResponse);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user successfully', async () => {
            UserModel.findByIdAndDelete = jest.fn().mockResolvedValue(mockUser);

            const result = await UserRepository.deleteUser(mockUser._id);
            expect(result).toEqual(mockUser);
            expect(UserModel.findByIdAndDelete).toHaveBeenCalledWith(mockUser._id);
        });

        it('should throw an error for invalid user ID', async () => {
            await expect(UserRepository.deleteUser('invalid-id')).rejects.toThrow(ErrorResponse);
        });

        it('should throw an error if user is not found', async () => {
            UserModel.findByIdAndDelete = jest.fn().mockResolvedValue(null);

            await expect(UserRepository.deleteUser(mockUser._id)).rejects.toThrow(ErrorResponse);
        });
    });
});

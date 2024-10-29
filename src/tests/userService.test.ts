import { Types } from 'mongoose'; // Import Types from mongoose
import { UserService } from '../services/user'; // Adjust the path as needed
import { UserRepository } from '../repositories/user'; // Import the UserRepository
import { IUser } from '../models/user';
import ErrorResponse from '../utils/errorResponse';

// Mock the UserRepository to avoid real DB calls
jest.mock('../repositories/user');

describe('UserService', () => {
    const mockUser = {
        _id: new Types.ObjectId(), // Add the _id property
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        phone: '1234567890',
        usertype: 'buyer',
        createdAt: new Date(), // Assuming you have this property
        updatedAt: new Date(), // Assuming you have this property
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        it('should create a new user successfully', async () => {
            // Mock UserRepository.createUser to resolve with the mock user
            (UserRepository.createUser as jest.Mock).mockResolvedValue(mockUser);

            const result = await UserService.createUser(mockUser as  IUser);

            // Assertions
            expect(result).toEqual(mockUser);
            expect(UserRepository.createUser).toHaveBeenCalledWith(mockUser);
        });

        it('should throw an error if user creation fails', async () => {
            // Mock UserRepository.createUser to reject
            (UserRepository.createUser as jest.Mock).mockRejectedValue(new Error('Error creating user'));

            await expect(UserService.createUser(mockUser as  IUser)).rejects.toThrow(ErrorResponse);
        });
    });

    describe('getAllUsers', () => {
        it('should return all users', async () => {
            const users = [mockUser];

            // Mock UserRepository.getAllUsers to resolve with the users array
            (UserRepository.getAllUsers as jest.Mock).mockResolvedValue(users);

            const result = await UserService.getAllUsers();

            // Assertions
            expect(result).toEqual(users);
            expect(UserRepository.getAllUsers).toHaveBeenCalled();
        });

        it('should throw an error if fetching users fails', async () => {
            // Mock UserRepository.getAllUsers to reject
            (UserRepository.getAllUsers as jest.Mock).mockRejectedValue(new Error('Error fetching users'));

            await expect(UserService.getAllUsers()).rejects.toThrow(ErrorResponse);
        });
    });

    describe('getUserById', () => {
        it('should return a user by ID', async () => {
            const userId = '607d1c5e5b6a0d6c1d456e07'; // Example user ID

            // Mock UserRepository.getUserById to resolve with the mock user
            (UserRepository.getUserById as jest.Mock).mockResolvedValue(mockUser);

            const result = await UserService.getUserById(userId);

            // Assertions
            expect(result).toEqual(mockUser);
            expect(UserRepository.getUserById).toHaveBeenCalledWith(userId);
        });

        it('should throw an error if user not found', async () => {
            const userId = '607d1c5e5b6a0d6c1d456e07'; // Example user ID

            // Mock UserRepository.getUserById to reject
            (UserRepository.getUserById as jest.Mock).mockRejectedValue(new Error('User not found'));

            await expect(UserService.getUserById(userId)).rejects.toThrow(ErrorResponse);
        });
    });

    describe('getUserByEmail', () => {
        it('should return a user by email', async () => {
            const email = 'johndoe@example.com';

            // Mock UserRepository.getUserByEmail to resolve with the mock user
            (UserRepository.getUserByEmail as jest.Mock).mockResolvedValue(mockUser);

            const result = await UserService.getUserByEmail(email);

            // Assertions
            expect(result).toEqual(mockUser);
            expect(UserRepository.getUserByEmail).toHaveBeenCalledWith(email);
        });

        it('should throw an error if user not found by email', async () => {
            const email = 'nonexistent@example.com';

            // Mock UserRepository.getUserByEmail to reject
            (UserRepository.getUserByEmail as jest.Mock).mockRejectedValue(new Error('User not found'));

            await expect(UserService.getUserByEmail(email)).rejects.toThrow(ErrorResponse);
        });
    });

    describe('checkUserExist', () => {
        it('should return a user if they exist', async () => {
            const email = 'johndoe@example.com';

            // Mock UserRepository.checkUserExist to resolve with the mock user
            (UserRepository.checkUserExist as jest.Mock).mockResolvedValue(mockUser);

            const result = await UserService.checkUserExist(email);

            // Assertions
            expect(result).toEqual(mockUser);
            expect(UserRepository.checkUserExist).toHaveBeenCalledWith(email);
        });

        it('should return null if user does not exist', async () => {
            const email = 'nonexistent@example.com';

            // Mock UserRepository.checkUserExist to resolve with null
            (UserRepository.checkUserExist as jest.Mock).mockResolvedValue(null);

            const result = await UserService.checkUserExist(email);

            // Assertions
            expect(result).toBeNull();
            expect(UserRepository.checkUserExist).toHaveBeenCalledWith(email);
        });

        it('should throw an error if checking user existence fails', async () => {
            const email = 'johndoe@example.com';

            // Mock UserRepository.checkUserExist to reject
            (UserRepository.checkUserExist as jest.Mock).mockRejectedValue(new Error('Error checking user existence'));

            await expect(UserService.checkUserExist(email)).rejects.toThrow(ErrorResponse);
        });
    });

    describe('updateUser', () => {
        it('should update a user successfully', async () => {
            const userId = '607d1c5e5b6a0d6c1d456e07'; // Example user ID

            // Mock UserRepository.updateUser to resolve with the updated mock user
            (UserRepository.updateUser as jest.Mock).mockResolvedValue(mockUser);

            const result = await UserService.updateUser(userId, mockUser as  IUser);

            // Assertions
            expect(result).toEqual(mockUser);
            expect(UserRepository.updateUser).toHaveBeenCalledWith(userId, mockUser);
        });

        it('should throw an error if user update fails', async () => {
            const userId = '607d1c5e5b6a0d6c1d456e07'; // Example user ID

            // Mock UserRepository.updateUser to reject
            (UserRepository.updateUser as jest.Mock).mockRejectedValue(new Error('Error updating user'));

            await expect(UserService.updateUser(userId, mockUser as  IUser)).rejects.toThrow(ErrorResponse);
        });
    });

    describe('deleteUser', () => {
        it('should delete a user successfully', async () => {
            const userId = '607d1c5e5b6a0d6c1d456e07'; // Example user ID

            // Mock UserRepository.deleteUser to resolve with the deleted mock user
            (UserRepository.deleteUser as jest.Mock).mockResolvedValue(mockUser);

            const result = await UserService.deleteUser(userId);

            // Assertions
            expect(result).toEqual(mockUser);
            expect(UserRepository.deleteUser).toHaveBeenCalledWith(userId);
        });

        it('should throw an error if user deletion fails', async () => {
            const userId = '607d1c5e5b6a0d6c1d456e07'; // Example user ID

            // Mock UserRepository.deleteUser to reject
            (UserRepository.deleteUser as jest.Mock).mockRejectedValue(new Error('Error deleting user'));

            await expect(UserService.deleteUser(userId)).rejects.toThrow(ErrorResponse);
        });
    });
});

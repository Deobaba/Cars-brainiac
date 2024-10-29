import { Types } from 'mongoose'; // Import Types from mongoose
import { CarService } from '../services/car'; // Adjust the path as needed
import { CarRepository } from '../repositories/car'; // Import the CarRepository
import { ICar } from '../models/car';
import ErrorResponse from '../utils/errorResponse';

// Mock the CarRepository to avoid real DB calls
jest.mock('../repositories/car');

describe('CarService', () => {
    const mockCar = {
        _id: new Types.ObjectId(), // Add the _id property
        make: 'Toyota',
        year: 2020,
        carModel: 'Corolla',
        mileage: 15000,
        price: 20000,
        description: 'A reliable car.',
        pictures: ['picture1.jpg', 'picture2.jpg'],
        availability: true,
        sellerId: new Types.ObjectId(), // Mocked seller ID
        // Add other properties if your ICar interface requires them
        createdAt: new Date(), // Assuming you have this property
        updatedAt: new Date(), // Assuming you have this property
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createCar', () => {
        it('should create a new car successfully', async () => {
            // Mock CarRepository.createCar to resolve with the mock car
            (CarRepository.createCar as jest.Mock).mockResolvedValue(mockCar);

            const result = await CarService.createCar(mockCar  as ICar);

            // Assertions
            expect(result).toEqual(mockCar);
            expect(CarRepository.createCar).toHaveBeenCalledWith(mockCar);
        });

        it('should throw an error if car creation fails', async () => {
            // Mock CarRepository.createCar to reject
            (CarRepository.createCar as jest.Mock).mockRejectedValue(new Error('Error creating car'));

            await expect(CarService.createCar(mockCar  as ICar)).rejects.toThrow(ErrorResponse);
        });
    });

    describe('getAllCars', () => {
        it('should return all cars with total count', async () => {
            const queryParams = {}; // Define any query parameters needed
            const result = { totalCount: 1, data: [mockCar] };

            // Mock CarRepository.getAllCars to resolve with the result
            (CarRepository.getAllCars as jest.Mock).mockResolvedValue(result);

            const cars = await CarService.getAllCars(queryParams);

            // Assertions
            expect(cars).toEqual(result);
            expect(CarRepository.getAllCars).toHaveBeenCalledWith(queryParams);
        });

        it('should throw an error if fetching cars fails', async () => {
            // Mock CarRepository.getAllCars to reject
            (CarRepository.getAllCars as jest.Mock).mockRejectedValue(new Error('Error fetching cars'));

            await expect(CarService.getAllCars({})).rejects.toThrow(ErrorResponse);
        });
    });

    describe('getCarById', () => {
        it('should return a car by ID', async () => {
            const carId = '607d1c5e5b6a0d6c1d456e07'; // Example car ID

            // Mock CarRepository.getCarById to resolve with the mock car
            (CarRepository.getCarById as jest.Mock).mockResolvedValue(mockCar);

            const car = await CarService.getCarById(carId);

            // Assertions
            expect(car).toEqual(mockCar);
            expect(CarRepository.getCarById).toHaveBeenCalledWith(carId);
        });

        it('should throw an error if car not found', async () => {
            const carId = '607d1c5e5b6a0d6c1d456e07'; // Example car ID

            // Mock CarRepository.getCarById to reject
            (CarRepository.getCarById as jest.Mock).mockRejectedValue(new Error('Car not found'));

            await expect(CarService.getCarById(carId)).rejects.toThrow(ErrorResponse);
        });
    });

    describe('updateCar', () => {
        it('should update a car successfully', async () => {
            const carId = '607d1c5e5b6a0d6c1d456e07'; // Example car ID

            // Mock CarRepository.updateCar to resolve with the updated mock car
            (CarRepository.updateCar as jest.Mock).mockResolvedValue(mockCar);

            const result = await CarService.updateCar(carId, mockCar  as ICar);

            // Assertions
            expect(result).toEqual(mockCar);
            expect(CarRepository.updateCar).toHaveBeenCalledWith(carId, mockCar);
        });

        it('should throw an error if car update fails', async () => {
            const carId = '607d1c5e5b6a0d6c1d456e07'; // Example car ID

            // Mock CarRepository.updateCar to reject
            (CarRepository.updateCar as jest.Mock).mockRejectedValue(new Error('Error updating car'));

            await expect(CarService.updateCar(carId, mockCar  as ICar)).rejects.toThrow(ErrorResponse);
        });
    });
});

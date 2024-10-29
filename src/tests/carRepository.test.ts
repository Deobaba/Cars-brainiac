import { Types, Model } from 'mongoose';
import ErrorResponse from '../utils/errorResponse';
import { ICar } from '../models/car';

// Define the model type
type CarModelType = Model<ICar>;

// Mock mongoose model before importing the repository
jest.mock('../models/car', () => {
    return {
        __esModule: true,
        default: jest.fn() as jest.MockedFunction<() => CarModelType>
    };
});

// Import after mocking
import CarModel from '../models/car';
import { CarRepository } from '../repositories/car';

// Create a partial type for our mock car data
type PartialICar = Pick<ICar, 'make' | 'carModel' | 'year' | 'price' | 'mileage' | 'availability' | 'sellerId' | 'description' | 'pictures'>;

describe('CarRepository', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createCar', () => {
        it('should create a new car successfully', async () => {
            const mockCar: PartialICar = {
                make: 'toyota',
                carModel: 'camry',
                year: 2020,
                price: 25000,
                mileage: 50000,
                availability: true,
                sellerId: new Types.ObjectId(),
                description: 'Test car',
                pictures: ['test.jpg']
            };

            // Mock `CarModel` to return a new instance that includes `save` method
            const saveMock = jest.fn().mockResolvedValue(mockCar);
            (CarModel as unknown as jest.Mock).mockImplementation(() => ({
                ...mockCar,
                save: saveMock,
            }));

            const result = await CarRepository.createCar(mockCar as ICar);

            expect(result).toMatchObject(mockCar); // Comparing the actual result to mockCar
            expect(CarModel).toHaveBeenCalledWith(mockCar);
            expect(saveMock).toHaveBeenCalled();
        });

        it('should throw error when car creation fails', async () => {
            const mockCar: PartialICar = {
                make: 'toyota',
                carModel: 'camry',
                year: 2020,
                price: 25000,
                mileage: 50000,
                availability: true,
                sellerId: new Types.ObjectId(),
                description: 'Test car',
                pictures: ['test.jpg']
            };

            const errorMessage = 'Database error';
            const saveMock = jest.fn().mockRejectedValue(new Error(errorMessage));
            (CarModel as unknown as jest.Mock).mockImplementation(() => ({
                save: saveMock
            }));

            await expect(CarRepository.createCar(mockCar as ICar))
                .rejects
                .toThrow(ErrorResponse);
        });
    });

    describe('getAllCars', () => {
        it('should get all cars with default pagination', async () => {
            const mockCars = [
                { make: 'toyota', carModel: 'camry' },
                { make: 'honda', carModel: 'civic' }
            ];

            const skipMock = jest.fn().mockResolvedValue(mockCars);
            const limitMock = jest.fn().mockReturnValue({ skip: skipMock });
            const findMock = jest.fn().mockReturnValue({ limit: limitMock });
            const countDocumentsMock = jest.fn().mockResolvedValue(2);

            (CarModel.find as unknown as jest.Mock) = findMock;
            (CarModel.countDocuments as unknown as jest.Mock) = countDocumentsMock;

            const result = await CarRepository.getAllCars({});

            expect(result).toEqual({ totalCount: 2, data: mockCars });
            expect(countDocumentsMock).toHaveBeenCalled();
            expect(findMock).toHaveBeenCalled();
            expect(limitMock).toHaveBeenCalledWith(10);
            expect(skipMock).toHaveBeenCalledWith(0);
        });

        });

    describe('getCarById', () => {
        it('should get car by id successfully', async () => {
            const mockCar = {
                _id: new Types.ObjectId(),
                make: 'toyota',
                carModel: 'camry'
            };

            const populateMock = jest.fn().mockResolvedValue(mockCar);
            const findByIdMock = jest.fn().mockReturnValue({ populate: populateMock });
            (CarModel.findById as unknown as jest.Mock) = findByIdMock;

            const result = await CarRepository.getCarById(mockCar._id.toString());

            expect(result).toEqual(mockCar);
            expect(findByIdMock).toHaveBeenCalledWith(mockCar._id.toString());
            expect(populateMock).toHaveBeenCalledWith({
                path: 'sellerId',
                select: 'name email'
            });
        });

        it('should throw error for invalid id', async () => {
            await expect(CarRepository.getCarById('invalid-id'))
                .rejects
                .toThrow(new ErrorResponse('Invalid car ID', 400));
        });

        it('should throw error when car not found', async () => {
            const validId = new Types.ObjectId().toString();
            const populateMock = jest.fn().mockResolvedValue(null);
            const findByIdMock = jest.fn().mockReturnValue({ populate: populateMock });
            (CarModel.findById as unknown as jest.Mock) = findByIdMock;

            await expect(CarRepository.getCarById(validId))
                .rejects
                .toThrow(new ErrorResponse('Car not found', 404));
        });
    });

    describe('updateCar', () => {
        it('should update car successfully', async () => {
            const mockCar: PartialICar = {
                make: 'toyota',
                carModel: 'camry',
                year: 2020,
                price: 25000,
                mileage: 50000,
                availability: true,
                sellerId: new Types.ObjectId(),
                description: 'Test car',
                pictures: ['test.jpg']
            };

            const findByIdAndUpdateMock = jest.fn().mockResolvedValue(mockCar);
            (CarModel.findByIdAndUpdate as unknown as jest.Mock) = findByIdAndUpdateMock;

            const result = await CarRepository.updateCar(new Types.ObjectId().toString(), mockCar as ICar);

            expect(result).toEqual(mockCar);
            expect(findByIdAndUpdateMock).toHaveBeenCalledWith(
                expect.any(String),
                mockCar,
                { new: true, runValidators: true }
            );
        });

        it('should throw error for invalid id', async () => {
            await expect(CarRepository.updateCar('invalid-id', {} as ICar))
                .rejects
                .toThrow(new ErrorResponse('Invalid car ID', 400));
        });

        it('should throw error when car not found', async () => {
            const validId = new Types.ObjectId().toString();
            const findByIdAndUpdateMock = jest.fn().mockResolvedValue(null);
            (CarModel.findByIdAndUpdate as unknown as jest.Mock) = findByIdAndUpdateMock;

            await expect(CarRepository.updateCar(validId, {} as ICar))
                .rejects
                .toThrow(new ErrorResponse('Car not found', 404));
        });
    });

    describe('deleteCar', () => {
        it('should delete car successfully', async () => {
            const mockCar = {
                _id: new Types.ObjectId(),
                make: 'toyota',
                carModel: 'camry'
            };

            const findByIdAndDeleteMock = jest.fn().mockResolvedValue(mockCar);
            (CarModel.findByIdAndDelete as unknown as jest.Mock) = findByIdAndDeleteMock;

            const result = await CarRepository.deleteCar(mockCar._id.toString());

            expect(result).toEqual(mockCar);
            expect(findByIdAndDeleteMock).toHaveBeenCalledWith(mockCar._id.toString());
        });

        it('should throw error for invalid id', async () => {
            await expect(CarRepository.deleteCar('invalid-id'))
                .rejects
                .toThrow(new ErrorResponse('Invalid car ID', 400));
        });

        it('should throw error when car not found', async () => {
            const validId = new Types.ObjectId().toString();
            const findByIdAndDeleteMock = jest.fn().mockResolvedValue(null);
            (CarModel.findByIdAndDelete as unknown as jest.Mock) = findByIdAndDeleteMock;

            await expect(CarRepository.deleteCar(validId))
                .rejects
                .toThrow(new ErrorResponse('Car not found', 404));
        });
    });
});
import { FilterQuery, Types } from "mongoose";
import CarModel from "../models/car";
import { ICar } from "../models/car";
import ErrorResponse from "../utils/errorResponse";
import { CarFilter } from "../interface";



export class CarRepository {

   static async createCar(car: ICar): Promise<ICar> {
        try{
            const newcar = new CarModel(car);
            await newcar.save();
            return newcar;
        }
        catch(err:any){
            throw new ErrorResponse(err.message, 404);
        }
    }
          
   
static async getAllCars(queryParams: CarFilter): Promise<{ totalCount: number; data: ICar[] }> {
    try {
        const filter: FilterQuery<ICar> = {};

        // Add filters based on query parameters
        if (queryParams.make) filter.make = queryParams.make.toLowerCase();
        if (queryParams.carModel) filter.carModel = queryParams.carModel.toLowerCase();
        if (queryParams.availability !== undefined) filter.availability = queryParams.availability;

        // Range filters
        if (queryParams.year) {
            filter.year = {};
            if (queryParams.year.min) filter.year.$gte = queryParams.year.min;
            if (queryParams.year.max) filter.year.$lte = queryParams.year.max;
        }

        if (queryParams.price) {
            filter.price = {};
            if (queryParams.price.min) filter.price.$gte = queryParams.price.min;
            if (queryParams.price.max) filter.price.$lte = queryParams.price.max;
        }

        if (queryParams.mileage) {
            filter.mileage = {};
            if (queryParams.mileage.min) filter.mileage.$gte = queryParams.mileage.min;
            if (queryParams.mileage.max) filter.mileage.$lte = queryParams.mileage.max;
        }

        // Get pagination values from query params with defaults
        const limit = queryParams.limit || 10;  // Default to 10 if no limit is provided
        const offset = queryParams.offset || 0; // Default to 0 if no offset is provided

        // Sorting logic
        let sortOption: any = {};
        if (queryParams.sortBy && ['price', 'mileage', 'year'].includes(queryParams.sortBy)) {
            const sortOrder = queryParams.order === 'desc' ? -1 : 1; // Default to ascending order
            sortOption[queryParams.sortBy] = sortOrder;
        }

        // Get total count of matching cars
        const totalCount = await CarModel.countDocuments(filter);

        // Get paginated and sorted data
        const data = await CarModel.find(filter)
            .sort(sortOption) // Apply sorting here
            .limit(limit)
            .skip(offset);

        // Return both totalCount and paginated data
        return { totalCount, data };
    } catch (err: any) {
        throw new ErrorResponse(err.message, 500);
    }
}
    
    static async getCarById(id: string): Promise<ICar> {
        try{

            if (!Types.ObjectId.isValid(id)) {
                throw new ErrorResponse("Invalid car ID", 400);
                }
                const car = await CarModel.findById(id).populate({
                    path: 'sellerId',  // Populate the sellerId field
                    select: 'name email'  // Only include the name and email fields
                })
        
                if (!car) {
                throw new ErrorResponse("Car not found", 404);
                }
                return car;

        }catch(err:any){

            if(err instanceof ErrorResponse){
                throw err
            }

            throw new ErrorResponse(err.message, 500);
        }
       
    }
    
    static async updateCar(id: string, car: ICar): Promise<ICar> {

        try{
            if (!Types.ObjectId.isValid(id)) {
                throw new ErrorResponse("Invalid car ID", 400);
            }
            const updatedCar = await CarModel.findByIdAndUpdate(id, car, {
                new: true,
                runValidators: true,
            });
            if (!updatedCar) {
                throw new ErrorResponse("Car not found", 404);
            }
            return updatedCar;
        }catch(err:any){
            if(err instanceof ErrorResponse){
                throw err
            }

            throw new ErrorResponse(err.message,500)

        }
       
    }
    
    static async deleteCar(id: string): Promise<ICar> {
        try{

            if (!Types.ObjectId.isValid(id)) {
                throw new ErrorResponse("Invalid car ID", 400);
            }
            const deletedCar = await CarModel.findByIdAndDelete(id);
            if (!deletedCar) {
                throw new ErrorResponse("Car not found", 404);
            }
            return deletedCar;
        }catch(err:any){
            if(err instanceof ErrorResponse){
                throw err
            }

            throw new ErrorResponse(err.message,500)
        }
       
    }
}
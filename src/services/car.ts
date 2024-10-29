import { CarRepository } from "../repositories/car";
import { ICar } from "../models/car";
import ErrorResponse from "../utils/errorResponse";
import { CarFilter } from "../interface";

export class CarService {

    // create new car
    static async createCar (car:ICar):Promise<ICar>{
        try{
            return await CarRepository.createCar(car);
        }catch(err:any){
            throw new ErrorResponse(err.message,404);
        }
    }

   // get all cars
static async getAllCars(queryParams: CarFilter): Promise<{ totalCount: number; data: ICar[] }> {
    try {
        // Call the repository method to get cars
        const result = await CarRepository.getAllCars(queryParams);
        
        // Return the result directly if it contains totalCount and data
        return result;
    } catch (err: any) {
        // Handle different error scenarios appropriately
        throw new ErrorResponse(err.message || 'An error occurred while fetching cars.', 500); // 500 for general server errors
    }
}

    // get car by id
    static async getCarById(id:string):Promise<ICar>{
        try{
            return await CarRepository.getCarById(id);
        }catch(err:any){
            throw new ErrorResponse(err.message,404);
        }
    }

    // update car
    static async updateCar(id:string,car:ICar):Promise<ICar>{
        try{
            return await CarRepository.updateCar(id,car);
        }catch(err:any){
            throw new ErrorResponse(err.message,404);
        }
    }

}
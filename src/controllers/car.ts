import asyncHandler from "../middlewares/async";
import { NextFunction, Request , Response} from "express"
import { CarService } from "../services/car";
import ErrorResponse from "../utils/errorResponse";
import { AppResponse } from "../utils/appResponse";
import {carValidationSchema,carFilterSchema  }from "../validation/car";
import { uploadFiles } from "../utils/cloudinary";
import { UploadApiResponse } from "cloudinary";
import { AuthenticatedRequest } from "../middlewares/authmiddleware";
import { Types } from "mongoose";


export const createCar = asyncHandler(async (req:AuthenticatedRequest, res: Response, next:NextFunction) => {
    const {error} = carValidationSchema.validate(req.body)
    if(error){
        return next( new ErrorResponse(error.details[0].message, 400))
    }
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
        return next(new ErrorResponse('Please upload images for the apartment', 400));
    }
     // Upload the images to Cloudinary using the provided uploadFiles function
     const uploadedUrls = (await uploadFiles('car-brainaic', req.files as Express.Multer.File[], req.body.name)) as UploadApiResponse[]
    //  add sellerId to req.body 
    req.body.sellerId = req.user?.id
    //  create car
    const car = await CarService.createCar(req.body);
    car.pictures?.push(...uploadedUrls.map((url) => url.secure_url))

    // save car 
    await car.save()
    return AppResponse(res,201,car.id,"car created successfully")
})

export const getAllCars = asyncHandler(async (req: Request, res: Response, next:NextFunction) => {

    const {error} = carFilterSchema.validate(req.query)
    if(error){
        return next(new ErrorResponse(error.details[0].message, 400))
    }
    const cars = await CarService.getAllCars(req.query);
    return AppResponse(res,200,cars,"cars fetched successfully")
})

export const getCarById = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params
    // check if id a valid 
    if (!Types.ObjectId.isValid(id)) {
        throw new ErrorResponse("Invalid car ID", 400);
    }
    const car = await CarService.getCarById(id);
    return AppResponse(res,200,car,"car fetched successfully")
})
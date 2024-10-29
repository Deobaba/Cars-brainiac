import asyncHandler from "../middlewares/async";
import { NextFunction, Request , Response} from "express"
import { UserService } from "../services/user";
import ErrorResponse from "../utils/errorResponse";
import bcrypt from "bcrypt";
import { loginValidationSchema, userValidationSchema } from "../validation/user";
import { AppResponse } from "../utils/appResponse";
import { generateToken } from "../utils/generateToken";




export const createUser = asyncHandler(async (req: Request, res: Response,next:NextFunction) => {
    const {error} = userValidationSchema.validate(req.body)
    if(error){
        return next( new ErrorResponse(error.details[0].message, 400))
    }
    // check if user already exist
    console.log(req.body)
    const userExist = await UserService.checkUserExist(req.body.email);
    if(userExist){
        return next(new ErrorResponse("User already exist", 400))
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    console.log(req.body)
    const user = await UserService.createUser(req.body);
    return AppResponse(res,201,user,"user created successfully")
})


export const loginUser = asyncHandler(async (req: Request, res: Response,next:NextFunction) => {
    const {error} = loginValidationSchema.validate(req.body)
    if(error){
        return next(new ErrorResponse(error.details[0].message, 400))
    }
    const {email, password} = req.body;

    // find user by email
    const user = await UserService.getUserByEmail(email);
    // compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return next(new ErrorResponse("Invalid credentials", 400))
    }

    const token = generateToken(user)
    // create token for user
    return AppResponse(res,200,token,"login successful")
})
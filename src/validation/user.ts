import Joi from 'joi';

// Interface for User input validation
export interface IUserInput {
    name: string;
    email: string;
    password: string;
    phone: string;
    usertype: 'buyer' | 'seller';
}

// Password validation pattern
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Joi validation schemas
export const userValidationSchema = Joi.object({
    name: Joi.string()
        .required()
        .min(2)
        .max(50)
        .trim()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name cannot exceed 50 characters',
            'any.required': 'Name is required'
        }),

    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2 })
        .lowercase()
        .trim()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),

    password: Joi.string()
        .required()
        .min(8)
        .pattern(passwordPattern)
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters long',
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
            'any.required': 'Password is required'
        }),

    phone: Joi.string()
        .required()
        .pattern(/^\+?[\d\s-]{10,}$/)
        .messages({
            'string.empty': 'Phone number is required',
            'string.pattern.base': 'Please provide a valid phone number',
            'any.required': 'Phone number is required'
        }),

    usertype: Joi.string()
        .required()
        .valid('buyer', 'seller')
        .messages({
            'string.empty': 'User type is required',
            'any.only': 'User type must be either buyers or sellers',
            'any.required': 'User type is required'
        })
});

// Login validation schema
export const loginValidationSchema = Joi.object({
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2 })
        .lowercase()
        .trim()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),

    password: Joi.string()
        .required()
        .messages({
            'string.empty': 'Password is required',
            'any.required': 'Password is required'
        })
});










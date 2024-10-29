import Joi from 'joi';


// Interface for Car validation
export interface ICarInput {
  make: string;
  year: number;
  carModel:string;
  mileage: number;
  price: number;
  description: string;
  availability: boolean;
  sellerId: string;
}

// Joi validation schema
export const carValidationSchema = Joi.object({
  make: Joi.string().required().trim()
    .messages({
      'string.empty': 'Make is required',
      'any.required': 'Make is required'
    }),

  carModel: Joi.string().required().trim()
    .messages({
      'string.empty': 'Car model is required',
      'any.required': 'Car model is required'
    }),

  year: Joi.number().required().min(1900).max(new Date().getFullYear() + 1)
    .messages({
      'number.base': 'Year must be a number',
      'number.min': 'Year must be 1900 or later',
      'number.max': 'Year cannot be in the future',
      'any.required': 'Year is required'
    }),

  mileage: Joi.number().required().min(0)
    .messages({
      'number.base': 'Mileage must be a number',
      'number.min': 'Mileage cannot be negative',
      'any.required': 'Mileage is required'
    }),

  price: Joi.number().required().min(0)
    .messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price cannot be negative',
      'any.required': 'Price is required'
    }),

  description: Joi.string().required().trim().min(10).max(1000)
    .messages({
      'string.empty': 'Description is required',
      'string.min': 'Description must be at least 10 characters long',
      'string.max': 'Description cannot exceed 1000 characters',
      'any.required': 'Description is required'
    }),

  availability: Joi.boolean().required()
    .messages({
      'boolean.base': 'Availability must be a boolean',
      'any.required': 'Availability is required'
    })
 
});





export const carFilterSchema = Joi.object({
  make: Joi.string()
      .optional()
      .messages({
          'string.base': 'Make must be a text value'
      }),
  model: Joi.string()
      .optional()
      .messages({
          'string.base': 'Model must be a text value'
      }),
  year: Joi.object({
      min: Joi.number()
          .integer()
          .min(1886)
          .optional()
          .messages({
              'number.base': 'Minimum year must be a number',
              'number.integer': 'Minimum year must be a whole number',
              'number.min': 'Minimum year cannot be earlier than 1886'
          }),
      max: Joi.number()
          .integer()
          .min(1886)
          .optional()
          .messages({
              'number.base': 'Maximum year must be a number',
              'number.integer': 'Maximum year must be a whole number',
              'number.min': 'Maximum year cannot be earlier than 1886'
          })
  })
  .optional()
  .custom((value, helpers) => {
      if (value?.min && value?.max && value.min > value.max) {
          return helpers.error('year.minMax', {
              min: value.min,
              max: value.max
          });
      }
      return value;
  })
  .messages({
      'year.minMax': 'Minimum year cannot be greater than maximum year'
  }),
  mileage: Joi.object({
      min: Joi.number()
          .integer()
          .min(0)
          .optional()
          .messages({
              'number.base': 'Minimum mileage must be a number',
              'number.integer': 'Minimum mileage must be a whole number',
              'number.min': 'Minimum mileage cannot be negative'
          }),
      max: Joi.number()
          .integer()
          .min(0)
          .optional()
          .messages({
              'number.base': 'Maximum mileage must be a number',
              'number.integer': 'Maximum mileage must be a whole number',
              'number.min': 'Maximum mileage cannot be negative'
          })
  })
  .optional()
  .custom((value, helpers) => {
      if (value?.min && value?.max && value.min > value.max) {
          return helpers.error('mileage.minMax', {
              min: value.min,
              max: value.max
          });
      }
      return value;
  })
  .messages({
      'mileage.minMax': 'Minimum mileage cannot be greater than maximum mileage'
  }),
  price: Joi.object({
      min: Joi.number()
          .positive()
          .optional()
          .messages({
              'number.base': 'Minimum price must be a number',
              'number.positive': 'Minimum price must be greater than 0'
          }),
      max: Joi.number()
          .positive()
          .optional()
          .messages({
              'number.base': 'Maximum price must be a number',
              'number.positive': 'Maximum price must be greater than 0'
          })
  })
  .optional()
  .custom((value, helpers) => {
      if (value?.min && value?.max && value.min > value.max) {
          return helpers.error('price.minMax', {
              min: value.min,
              max: value.max
          });
      }
      return value;
  })
  .messages({
      'price.minMax': 'Minimum price cannot be greater than maximum price'
  }),
  availability: Joi.boolean()
      .optional()
      .messages({
          'boolean.base': 'Availability must be true or false'
      }),
  limit: Joi.number()
      .integer()
      .min(1)
      .optional()
      .messages({
          'number.base': 'Limit must be a number',
          'number.integer': 'Limit must be a whole number',
          'number.min': 'Limit must be at least 1'
      }),
  offset: Joi.number()
      .integer()
      .min(0)
      .optional()
      .messages({
          'number.base': 'Offset must be a number',
          'number.integer': 'Offset must be a whole number',
          'number.min': 'Offset cannot be negative'
      }),
      sortBy: Joi.string()
      .valid('price', 'mileage', 'year')
      .optional()
      .messages({
          'any.only': 'SortBy must be one of [price, mileage, year]',
          'string.base': 'SortBy must be a text value'
      }),
      order: Joi.string()
      .valid('asc', 'desc')
      .optional()
      .default('asc')
      .messages({
          'any.only': 'Order must be either asc or desc',
          'string.base': 'Order must be a text value'
      })
});




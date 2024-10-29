import express from "express";
import * as carController from "../controllers/car";
import authMiddleware from "../middlewares/authmiddleware";
import upload from "../utils/multer";

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Car:
 *       type: object
 *       properties:
 *         make:
 *           type: string
 *           description: The car's make or brand
 *           example: Toyota
 *         carModel:
 *           type: string
 *           description: The car's model
 *           example: Camry
 *         year:
 *           type: number
 *           description: The car's manufacturing year
 *           example: 2021
 *         mileage:
 *           type: number
 *           description: The car's mileage in miles
 *           example: 12000
 *         price:
 *           type: number
 *           description: The selling price of the car
 *           example: 15000
 *         pictures:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of picture URLs
 *           example: ["url1.jpg", "url2.jpg"]
 *         description:
 *           type: string
 *           description: Description of the car
 *           example: "Well-maintained, single owner."
 *         availability:
 *           type: boolean
 *           description: Car availability status
 *           example: true
 *         sellerId:
 *           type: string
 *           description: Reference ID of the seller
 *           example: "60d0fe4f5311236168a109ca"
 */

/**
 * @swagger
 * /api/cars:
 *   post:
 *     summary: Create a new car listing with images
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []   # Assuming you have JWT or similar auth
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               make:
 *                 type: string
 *                 description: Car make
 *                 example: Toyota
 *               carModel:
 *                 type: string
 *                 description: Car model
 *                 example: Camry
 *               year:
 *                 type: integer
 *                 description: Manufacturing year
 *                 example: 2021
 *               mileage:
 *                 type: number
 *                 description: Car mileage in miles
 *                 example: 50000
 *               price:
 *                 type: number
 *                 description: Price of the car
 *                 example: 15000
 *               description:
 *                 type: string
 *                 description: Description of the car
 *                 example: "A well-maintained vehicle with low mileage."
 *               availability:
 *                 type: boolean
 *                 description: Whether the car is available
 *                 example: true
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Car images (supports multiple files)
 *     responses:
 *       201:
 *         description: Car created successfully
 *       400:
 *         description: Bad request
 */

router.post("/", authMiddleware(["seller"]), upload.array("files", 20), carController.createCar);
/**
 * @swagger
 * /api/cars:
 *   get:
 *     summary: Retrieve all car listings with optional filters, sorting, and pagination
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: make
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter cars by make
 *       - in: query
 *         name: model
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter cars by model
 *       - in: query
 *         name: year[min]
 *         schema:
 *           type: integer
 *         required: false
 *         description: Minimum year of the car
 *       - in: query
 *         name: year[max]
 *         schema:
 *           type: integer
 *         required: false
 *         description: Maximum year of the car
 *       - in: query
 *         name: price[min]
 *         schema:
 *           type: integer
 *           example: 100
 *         required: false
 *         description: Minimum price of the car
 *       - in: query
 *         name: price[max]
 *         schema:
 *           type: integer
 *           example: 50000000
 *         required: false
 *         description: Maximum price of the car
 *       - in: query
 *         name: mileage[min]
 *         schema:
 *           type: integer
 *           example: 0
 *         required: false
 *         description: Minimum mileage of the car
 *       - in: query
 *         name: mileage[max]
 *         schema:
 *           type: integer
 *           example: 50000
 *         required: false
 *         description: Maximum mileage of the car
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: The number of results to return per page
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         required: false
 *         description: The number of results to skip before starting to collect the results set
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [price, mileage, year]
 *         required: false
 *         description: The field by which to sort results (price, mileage, or year)
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         required: false
 *         description: Sort order - ascending (asc) or descending (desc)
 *     responses:
 *       200:
 *         description: List of all cars matching the filters with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Car'
 *       401:
 *         description: Unauthorized
 */

router.get("/", authMiddleware(["buyer", "seller"]), carController.getAllCars);

/**
 * @swagger
 * /api/cars/{id}:
 *   get:
 *     summary: Retrieve a specific car by ID
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The car ID
 *     responses:
 *       200:
 *         description: Car data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Car'
 *       404:
 *         description: Car not found
 */
router.get("/:id", authMiddleware(["buyer", "seller"]), carController.getCarById);

export default router;
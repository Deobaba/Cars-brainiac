import { Request, Response, NextFunction } from 'express';
import  { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from '../utils/generateToken';
import ErrorResponse from '../utils/errorResponse';
import { UserService } from '../services/user';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    usertype: string;
  };
}

// Middleware factory to generate middleware based on allowed user types
const authMiddleware = (allowedUserTypes: string[]) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
console.log(token)
    if (!token) {
      return next(new ErrorResponse('Access forbidden: no token provided.', 403));
    }

    try {
      // Verify the token with the secret key
      const decoded = verifyToken(token) as JwtPayload & {
        id: string;
        usertype: string;
      };

      // Find user by id
      const user = await UserService.getUserById(decoded.id);
      if (!user) {
        return next(new ErrorResponse('Access forbidden: user not found.', 403));
      }

      // Check if the user's type is allowed to access this route
      if (!allowedUserTypes.includes(decoded.usertype)) {
        return next(new ErrorResponse('Access forbidden: invalid user type.', 403));
      }

      // Attach user info to the request for further use in the route handler
      req.user = {
        id: decoded.id,
        usertype: decoded.usertype,
      };

      next();
    } catch (error) {
      return next(new ErrorResponse('Access forbidden: invalid token.', 403));
    }
  };
};

export default authMiddleware;

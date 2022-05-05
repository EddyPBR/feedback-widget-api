import type { Request, Response, NextFunction } from "express";
import AppException from "~exceptions/App.exception";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ErrorHandling = (error: Error, _: Request, response: Response, next: NextFunction ) => {
  if (error instanceof AppException) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response.status(500).json({
    message: `Internal server error - ${error.message}`,
  });
};

export default ErrorHandling;

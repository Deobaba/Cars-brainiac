class ErrorResponse extends Error {
    statusCode: number;
    errors?: any;
  
    constructor(message: string, statusCode: number, errors?: any) {
      super(message);
      this.statusCode = statusCode;
      this.errors = errors;
      Object.setPrototypeOf(this, ErrorResponse.prototype);
    }
}
  
export default ErrorResponse;
export class AppError extends Error {
  constructor(message, type = 'GENERAL') {
    super(message);
    this.name = this.constructor.name;
    this.type = type;
  }
}

export class ValidationError extends AppError {
  constructor(message,type='VALIDATION') { 
    super(message);
    this.type = type; 
  }
}

export class NotFoundError extends AppError {
  constructor(message,type='NOT_FOUND') { 
    super(message);
    this.type = type; 
  }
}

export class NetworkError extends AppError {
  constructor(message,type='NETWORK') { 
    super(message);
    this.type = type; 
  }
}


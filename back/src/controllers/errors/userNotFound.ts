export class UserNotFoundError extends Error {
  id: string;

  constructor(id: string, message: string){
    super(message);
    this.id = id;
  }
} 
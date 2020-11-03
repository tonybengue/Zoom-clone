import { existingUsers, User } from "../models/users.models";

export function createUser(firstName: string, lastName: string, email: string){
  const user = new User(firstName, lastName, email);
  existingUsers.push(user);

  return user;
}

export function getUser(id: number): User | undefined {
  return existingUsers.find(user => user.id === id);
}
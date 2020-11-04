import { existingUsers, User } from "../models/users.models";
import { UserNotFoundError } from "./errors/userNotFound";

// Create an user
export function createUser(firstName: string, lastName: string, email: string): User{
  const user = new User(firstName, lastName, email);
  existingUsers.push(user);

  return user;
}

// Get all the users
export function getUsers() {
  return existingUsers;
}

// Delete an user
export function deleleteUser(id: number) {
  // return existingUsers;
}

// Update an us by it's id
export function updateUser(id: number, firstName?: string, lastName?: string, email?: string){
  const filteredUser = getUser(id);
  if(!filteredUser){
    throw new UserNotFoundError(id, "The user has not been found");
  }

  const updatedUser = {
    ...filteredUser,
    firstname: firstName || filteredUser.firstName,
    lastname: lastName || filteredUser.lastName,
    email: email || filteredUser.email
  }
}

// Get an user by his id
export function getUser(id: number): User | undefined {
  return existingUsers.find(user => user.id === id);
}
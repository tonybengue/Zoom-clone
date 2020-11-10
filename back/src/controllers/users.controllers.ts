import { IUser, User } from "../models/users.models";
import { UserNotFoundError } from "./errors/userNotFound";
import { DatabaseError } from "./errors/databaseError";

// Create an user
export function createUser(firstName: string, lastName: string, email: string): IUser {
  const user = new User({firstName, lastName, email});
  user.save();

  return user;
}

// Get all the users
export function getUsers(callback: (users: IUser[]) => void): void {
  // return existingUsers;
  User.find({}, (err, users) => {
    if (err) { throw new DatabaseError(err); }
    callback(users)
  });
}

// Delete an user
export function deleteUser(id: string, callback: (user: IUser) => void): void {
  User.findByIdAndDelete(id, (err, user) => {
    if(err) console.log(err);
    console.log("Successful deletion ", user);

    if (user) callback(user);
  });
}
// Update an us by it's id
export function updateUser(id: string, firstName?: string, lastName?: string, email?: string, callback?: (user: IUser) => void) {
// export function updateUser(id: string, firstName?: string, lastName?: string, email?: string): IUser {
  User.findById(id, (err, user) => {
    if(err) throw new DatabaseError(err);
    if(!user) throw new UserNotFoundError(id, "User not found");

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;

    user.save();

    if (callback) callback(user);
  });
}

// Get an user by his id
export function getUser(id: string, callback: (user: IUser | null) => void): void {
  User.findById(id, (err, res) => {
    if(err) throw new DatabaseError(err) // Errors
    callback(res); // Response
  });
}

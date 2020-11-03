/**
 * User model
 */
export class User {
  static last_id = 0;
  id: number;
  firstName: string;
  lastName: string;
  email: string;

  constructor(firstname: string, lastname: string, email: string){
    User.last_id += 1;
    this.id = User.last_id;
    this.firstName = firstname;
    this.lastName = lastname;
    this.email = email;
  }

  status(){
    return `Je m'appelle ${this.firstName} ${this.lastName} et suis joignable sur ${this.email}`;
  }

  changeLastname(newName: string){
    this.lastName = newName
  }

  changeFirstname(newFirstname: string){
    this.firstName = newFirstname;
  }
}

export const existingUsers = [
  new User('Tony', 'Bengué', 'tonybengue@hotmail.fr'),
  new User('Annie', 'Bengué', 'anniebengue@hotmail.fr'),
  new User('Daniel', 'Bengué', 'danielbengue@hotmail.fr')
]
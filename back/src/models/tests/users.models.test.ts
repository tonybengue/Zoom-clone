import { User } from '../users.models';

describe('User functions', () => {
  test('User#changeFirstname', () => {
    const thomas = new User("Thomas", "Falcone", "adresse");
    thomas.changeFirstname("Bernard");
    expect(thomas.firstName).toBe("Bernard");
  });

  test('User#changeLastname', () => {
    const thomas = new User("Thomas", "Falcone", "adresse");
    thomas.changeLastname("Dupont");
    expect(thomas.lastName).toBe("Dupont");
  });
});
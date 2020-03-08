import Faker from 'faker'

export default function usersInfo(state = {}, action) {
  switch (action.type) {
    case "SET_DATA":
      let user;
      const users = [];
      for (let i = 0; i < 10; i++) {
        user = [
          Faker.name.firstName(),
          Faker.name.lastName(),
          Faker.internet.userName(),
          Faker.internet.email(),
          Faker.random.boolean().toString(),
          'kekw',
          Faker.address.state(),
        ]
        users.push(user);
      }
      return {...state, users: users}
    default:
      return state
  }
}

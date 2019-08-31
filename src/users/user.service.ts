import { getConnection } from 'typeorm';
import { User } from './user.model';

export const createUser = async () => {
  const userRepo = await getConnection().getRepository(User);
  const user = new User();
  user.email = 'myemail@gmail.com';
  user.firstName = 'myname';
  user.lastName = 'name';
  await userRepo.save(user);
};

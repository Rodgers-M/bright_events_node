import { describeDbTestSuite } from '../../util/describeDbTestSuite';
import {RawAccount} from './user.types';
import {UserResource} from './user.resource';

describeDbTestSuite('UserResource', (knexInstance) => {
  describe('create', () => {
    test('it should create a user', async () => {
      const createAccountBody = {
        email: 'example@email.com',
        password: 'r0z2qrRU87RET'
      };

      const rawAccountKeys = ['id', 'email', 'password', 'createdAt', 'updatedAt'];

      const createdAccount: RawAccount = await UserResource.create(createAccountBody);
      expect(createdAccount).not.toBe(null);
      expect(createdAccount).toMatchObject(createdAccount);
      expect(Object.keys(createdAccount)).toEqual(expect.arrayContaining(rawAccountKeys)) ;
    });
  });
});

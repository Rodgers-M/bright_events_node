import { describeDbTestSuite } from '../../util/describeDbTestSuite';

describeDbTestSuite('UserResource', (knexInstance) => {
  describe('create', () => {
    test('it should create a user', async () => {
      expect(true).toEqual(true);
    });
  });
});

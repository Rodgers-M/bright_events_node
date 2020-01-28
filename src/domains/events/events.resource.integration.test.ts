import { describeDbTestSuite } from '../../test/describeDbTestSuite';
import { EventsResource } from './events.resource';

describeDbTestSuite('EventsResource', () => {
  describe('filterEvents', () => {
    test('it should log some query', async () => {
       const results = await EventsResource.filterEvents({q: 'mombasa'});
       console.log(results); });
  });
});

import { describeDbTestSuite } from '../../test/describeDbTestSuite';
import { EventsResource } from './events.resource';

describeDbTestSuite('EventsResource', () => {
  describe('filterEvents', () => {
    test('it should log some query', async () => {
       const results = await EventsResource.filterEvents({location: 'nairobi', date: '2018-10-20', rsvpEndDate: '2018-10-10'});
       console.log(results); });
  });
});

import { RsvpsLookupKey, RawRsvps } from './rsvps.types';

interface RsvpsResource {
  create(accountId: string, eventId: string): Promise<Readonly<any>>;
  cancel(accountId: string, eventId: string): Promise<Readonly<any>>;
  getRsvps(rsvpsLookUpKey: RsvpsLookupKey, value: string): Promise<Readonly<RawRsvps[]>>;
}

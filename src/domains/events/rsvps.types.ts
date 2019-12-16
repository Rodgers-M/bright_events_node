export enum RsvpsLookupKey {
  ACCOUNT_ID = 'accountId',
  EVENT_ID = 'eventId',
}

export interface RawRsvps {
  accountId: string;
  eventId: string;
  attended: boolean;
  canceled: boolean;
}

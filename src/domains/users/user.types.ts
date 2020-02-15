export interface AccountBody {
  email: string;
  password: string;
}

export interface Account {
  id: string;
  email: string;
}

export interface RawAccount {
  id: string;
  email: string;
  password: string;
}

export interface AccountResponse {
  message: string;
  token: string;
}

export enum AccountLookupKey {
  ID = 'id',
  EMAIL = 'email'
}

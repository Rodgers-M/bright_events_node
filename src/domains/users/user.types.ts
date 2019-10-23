export interface CreateAccountBody {
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

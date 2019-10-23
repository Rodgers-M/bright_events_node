export interface CreateAccountBody {
  email: string;
  password: string;
}

export interface RawAccount {
  id: string;
  email: string;
  password: string;
}

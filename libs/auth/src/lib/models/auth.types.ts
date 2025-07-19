export enum AccountType {
  INDIVIDUAL = 'INDIVIDUAL',
  COMPANY = 'COMPANY',
  ADMIN = 'ADMIN'
}

export interface SignupRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  accountType: AccountType;
}

export interface LoginRequest {
  usernameOrEmail: string;
  password: string;
} 
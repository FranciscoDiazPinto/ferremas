enum UserRole {
  Client = 'client',
  Seller = 'seller',
  Accountant = 'accountant',
  Admin = 'admin',
}

interface User {
  id?: number;
  username: string;
  password?: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  rol: UserRole;
}

export { User, UserRole };
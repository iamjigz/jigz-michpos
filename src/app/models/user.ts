export interface Roles {
  subscriber?: boolean;
  editor?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: Roles;
}

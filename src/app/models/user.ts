export interface Roles {
  subscriber?: boolean;
  editor?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email: string;
  roles: Roles;
  photoURL?: string;
}

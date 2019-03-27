export type User = {
  id: number,
  username: string,
  password: string,
  email?: string,
  firstName?: string,
  lastName?: string,
  displayName: string,
  emailOptIn?: boolean,
  deleting?: boolean
};

export type ErrorObj = {
  request?: any,
  status?: string,
  error: string
};

export type Alert = {
  type: string,
  message: string
};

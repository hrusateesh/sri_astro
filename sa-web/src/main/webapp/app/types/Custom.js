export type User = {
  id: number,
  username: string,
  password: string,
  firstName?: string,
  lastName?: string,
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

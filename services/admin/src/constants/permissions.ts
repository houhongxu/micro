export const PERMISSIONS = {
  USER_CREATE: 'user-register',
  USER_LOGIN: 'user-login',
} as const;

export type PermissionValue = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export type PermissionKey = keyof typeof PERMISSIONS;

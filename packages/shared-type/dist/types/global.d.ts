export interface IUserInfo {
    id: number;
    email: string;
    username: string;
    head_picture: string;
    phone: string;
    roles: string[];
    permissions: string[];
}
export interface IResponse<T> {
    statusCode: number;
    message: string;
    data: T;
}
export type Option<T = string, K = string> = {
    value: T;
    label: K;
};

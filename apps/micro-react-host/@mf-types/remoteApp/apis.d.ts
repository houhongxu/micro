
    export type RemoteKeys = 'remoteApp/Button';
    type PackageType<T> = T extends 'remoteApp/Button' ? typeof import('remoteApp/Button') :any;
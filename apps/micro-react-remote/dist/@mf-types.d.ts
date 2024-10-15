
    export type RemoteKeys = 'REMOTE_ALIAS_IDENTIFIER/Button';
    type PackageType<T> = T extends 'REMOTE_ALIAS_IDENTIFIER/Button' ? typeof import('REMOTE_ALIAS_IDENTIFIER/Button') :any;
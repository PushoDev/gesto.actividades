export type * from './auth';
export type * from './navigation';
export type * from './ui';

import type { Auth } from './auth';

export type SharedData = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
};

export type PageProps = {
    [K in keyof SharedData]: SharedData[K];
} & {
    [key: string]: unknown;
};

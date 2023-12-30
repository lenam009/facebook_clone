import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */

    interface User {
        access_token: string;
        refresh_token: string;
        user: IUser;
    }

    interface Session {
        error?: string;
        access_token: string;
        refresh_token: string;
        user: {
            _id: string;
            email: string;
        };

        access_expire: number;
        expires: string;
    }
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        access_token: string;
        refresh_token: string;
        user: {
            _id: string;
            email: string;
        };

        access_expire: number;
    }
}

import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { AuthOptions } from 'next-auth/core/types';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { sendRequest } from '@/utils/api';
import dayjs from 'dayjs';
import { handleSignInAction } from '@/utils/actions/actions';

// const refreshToken = async (token: JWT) => {
//     const res = await sendRequest<IBackendRes<ITrackTop[]>>({
//         url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/refresh`,
//         method: 'POST',
//         body: { refresh_token: token.refresh_token },
//     });

//     if (res.data) {
//         return {
//             ...token,
//             access_token: token.access_token,
//             refresh_token: token.refresh_token,
//             access_expire: dayjs(new Date())
//                 .add(
//                     +(process.env.TOKEN_EXPIRE_NUMBER as string),
//                     process.env.TOKEN_EXPIRE_UNIT as any,
//                 )
//                 .unix(),
//         };
//     } else {
//         return {
//             ...token,
//             error: 'Reshresh token failed',
//         };
//     }
// };

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: 'Facebook Clone',
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Email...' },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Password...',
                },
            },
            async authorize(credentials, req) {
                const userLogin = await handleSignInAction(
                    credentials?.email!,
                    credentials?.password!,
                );

                if (userLogin && userLogin.data) {
                    // Any object returned will be saved in `user` property of the JWT
                    return userLogin.data as any;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    throw new Error(userLogin?.message as string);

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user, account, profile, trigger }) {
            const dsa = profile;

            // GITHUB, GOOGLE
            if (trigger === 'signIn' && account?.provider !== 'credentials') {
                const res = await sendRequest<IBackendRes<JWT>>({
                    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/social-media`,
                    method: 'POST',

                    body: {
                        type: account?.provider.toLocaleUpperCase(),
                        username: user.email,
                    },
                });

                if (res.data) {
                    token.access_token = res.data.access_token;
                    token.refresh_token = res.data.refresh_token;
                    token.user = res.data.user;
                }
            }

            //CREDENTIAL
            if (trigger === 'signIn' && account?.provider === 'credentials') {
                if (token) {
                    token.access_token = user.access_token;
                    token.refresh_token = user.refresh_token;
                    const { _id, email } = user.user;
                    token.user = {
                        _id,
                        email,
                    };
                }
            }

            return token;
        },
        session({ session, token, user }) {
            if (token) {
                session.access_token = token.access_token;
                session.refresh_token = token.refresh_token;
                session.user = token.user;

                // session.access_expire = token.access_expire;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

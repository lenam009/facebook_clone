'use server';

import { sendRequest } from '../api';
import { getServerSession } from 'next-auth/next';
import { revalidateTag } from 'next/cache';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const handleLikeTrackAction = async (id: any, quantity: any) => {
    const session = await getServerSession(authOptions);

    const likeAction = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/likes`,
        method: 'POST',
        body: {
            track: id,
            quantity,
        },
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
    })
        .then(async (res) => {
            if (!res.data) return Promise.reject(res);

            return res.data;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });

    revalidateTag('track');

    return likeAction;
};

export const handleSignInAction = async (email: string, password: string) => {
    const userLogin = (await sendRequest<IBackendRes<IUser>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        method: 'POST',
        body: {
            email,
            password,
        },
    })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log('error handleSignInAction', error);
            return error;
        })) as IBackendRes<IUser>;

    return userLogin;
};

export const handleFollowUserAction = async () => {
    const likeAction = await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/65843d9edfd97497a727581d/follow`,
        method: 'PUT',
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTdmYjJiMjkwMmE2OTVkZGIwMDI1OWMiLCJ1c2VybmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJmb2xsb3dpbmdzIjpbIjY1ODQzMDRkN2YwZDgwZDllZTQ0NDYwNSJdLCJpYXQiOjE3MDMyMTk2MjksImV4cCI6MTcwMzgyNDQyOX0.bLS8qjtA80M3FV1fdP_4sIXDutPGA-o8t3m48wzWxEY`,
            // cache: 'no-store',
        },

        nextOption: {
            next: { tags: ['followuser'] },
        },
    })
        .then(async (res) => {
            return res.data;
        })
        .catch((error) => {
            console.log('error', error);
            return null;
        });

    // revalidateTag('followuser');
};

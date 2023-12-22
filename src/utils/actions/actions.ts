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

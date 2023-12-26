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
            return res;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });

    revalidateTag('track');

    return likeAction;
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

export const handleGetUserRandomAction = async () => {
    const session = await getServerSession(authOptions);

    const usersRandom = (await sendRequest<IBackendRes<IUser[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/getUserRandom`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
    })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log('error handleGetUserByFollowing', error);
            return error;
        })) as IBackendRes<IUser[]>;

    return usersRandom;
};

export const handleGetUserByFollowing = async () => {
    const session = await getServerSession(authOptions);

    const usersFollowing = (await sendRequest<IBackendRes<IUser[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/getUserByFollowing`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
            next: { tags: ['handleGetUserByFollowing'] },
        },
    })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log('error handleGetUserRandomAction', error);
            return error;
        })) as IBackendRes<IUser[]>;

    return usersFollowing;
};

export const handleGetOneUseById = async (id: string) => {
    const user = (await sendRequest<IBackendRes<IUser>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
        method: 'GET',
        queryParams: {
            _id: id,
        },
        nextOption: {
            next: { tags: ['handleGetOneUseById'] },
        },
    })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log('error getOneUseById', error);
            return error;
        })) as IBackendRes<IUser>;

    return user;
};

export const handleGetPostsFollowing = async () => {
    const session = await getServerSession(authOptions);

    console.log('session2', session);

    const postsFollowing = (await sendRequest<IBackendRes<IModelPaginate<IPost>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/post/timeline`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
        nextOption: {
            next: { tags: ['handleGetPostsFollowing'] },
        },
    })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log('error handleGetPostsFollowing', error);
            return error;
        })) as IBackendRes<IModelPaginate<IPost>>;

    return postsFollowing;
};

export const handleCreatePost = async (data: {
    desc: string;
    target_type: string;
    img?: string;
    video?: string;
}) => {
    const session = await getServerSession(authOptions);

    const createPost = (await sendRequest<IBackendRes<IModelPaginate<IPost>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/post`,
        method: 'POST',
        body: data,
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
            target_type: data.target_type,
        },
    })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log('error handleCreatePost', error);
            return error;
        })) as IBackendRes<IModelPaginate<IPost>>;

    return createPost;
};

export const handleLikeOrDisLikePost = async (idPost: string) => {
    const session = await getServerSession(authOptions);

    const createPost = (await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/post/${idPost}/like`,
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
        },
    })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log('error handleCreatePost', error);
            return error;
        })) as IBackendRes<IModelPaginate<IPost>>;

    return createPost;
};

export const handleRegister = async (data: {
    email: string;
    username: string;
    password: string;
}) => {
    const registerUser = (await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
        method: 'POST',
        body: data,
    })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log('error handleRegister', error);
            return error;
        })) as IBackendRes<IModelPaginate<IPost>>;

    return registerUser;
};

export const revalidateGetOneUseById = () => {
    revalidateTag('handleGetOneUseById');
};
export const revalidateGetPostsFollowing = () => {
    revalidateTag('handleGetPostsFollowing');
};

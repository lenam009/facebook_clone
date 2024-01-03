'use server';

import { sendRequest } from '../api';
import { getServerSession } from 'next-auth/next';
import { revalidateTag } from 'next/cache';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const handleFollowOrUnfollowUserAction = async (
    userIdFollowed: string,
    follow: boolean,
) => {
    const session = await getServerSession(authOptions);
    const isFollow: string = follow ? 'follow' : 'unfollow';

    const followAction = (await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/${userIdFollowed}/${isFollow}`,
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
            // cache: 'no-store',
        },

        nextOption: {
            next: { tags: ['handleFollowOrUnfollowUserAction'] },
        },
    })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log('error handleFollowOrUnfollowUserAction', error);
            return error;
        })) as IBackendRes<any>;

    return followAction;
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

export const handleGetUserByFollowing = async (userId: string) => {
    // const session = await getServerSession(authOptions);

    const usersFollowing = (await sendRequest<IBackendRes<IUser[]>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/getUserByFollowing/${userId}`,
        method: 'GET',
        headers: {
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

export const handleGetOneUserById = async (id: string) => {
    const user = (await sendRequest<IBackendRes<IUser>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
        method: 'GET',
        queryParams: {
            _id: id,
        },
        nextOption: {
            next: { tags: ['handleGetOneUserById'] },
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
        })) as IBackendRes<any>;

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
        })) as IBackendRes<any>;

    return registerUser;
};

export const handleGetPostsByUserId = async (userId: string) => {
    const posts = (await sendRequest<IBackendRes<IModelPaginate<IPost>>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/post/profile/${userId}`,
        method: 'GET',
        nextOption: {
            next: { tags: ['handleGetPostsByUserId'] },
        },
    })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log('error handleGetPostsByUserId', error);
            return error;
        })) as IBackendRes<IModelPaginate<IPost>>;

    return posts;
};

export const handleUpdateUser = async (data: {
    username: string;
    email: string;
    desc: string;
    city: string;
    from: string;
    profilePicture: string;
    coverPicture: string;
}) => {
    const session = await getServerSession(authOptions);

    const user = (await sendRequest<IBackendRes<any>>({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`,
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${session?.access_token}`,
            target_type: 'image_person',
        },
        body: data,
    })
        .then((res) => {
            return res;
        })
        .catch((error) => {
            console.log('error handleUpdateUser', error);
            return error;
        })) as IBackendRes<any>;

    return user;
};

export const revalidateGetOneUseById = () => {
    revalidateTag('handleGetOneUserById');
};
export const revalidateGetPostsFollowing = () => {
    revalidateTag('handleGetPostsFollowing');
};
export const revalidateGetPostsByUserId = () => {
    revalidateTag('handleGetPostsByUserId');
};

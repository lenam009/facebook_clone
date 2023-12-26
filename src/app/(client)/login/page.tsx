import React from 'react';
import AuthSignin from '@/components/auth/auth.signin';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { handleGetOneUseById } from '@/utils/actions/actions';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function LoginPage() {
    // const session = await getServerSession(authOptions);

    // console.log('sessionLogin', session);

    // useEffect(() => {
    //     if (session) {
    //         const fetchApi = async () => {
    //             const user = await handleGetOneUseById(session.user._id);

    //             // console.log('user', user.data);

    //             if (user.data) {
    //                 dispatch(setUser(user.data));
    //             }
    //         };

    //         fetchApi();

    //         router.push(routes.home.path);
    //     }
    // }, [session]);

    return (
        <Box>
            <AuthSignin />
        </Box>
    );
}

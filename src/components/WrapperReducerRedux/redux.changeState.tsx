'use client';
import React from 'react';
import { handleGetOneUserById } from '@/utils/actions/actions';
import { useAppDispatch, useAppSelector } from '@/utils/redux/hook';
import { setUser } from '@/utils/redux/userSlice';
import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation';
import routes from '@/config/routes/routes';

export default function ReduxChangeState({
    children,
    user,
}: {
    children: React.ReactNode;
    user: IBackendRes<IUser>;
}) {
    const dispatch = useAppDispatch();
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (user.data) dispatch(setUser(user.data));
    }, [user]);

    return (
        <>
            {/* <h1 style={{ marginTop: '60px' }}>{JSON.stringify(user)}</h1> */}
            {children}
        </>
    );
}

'use client';
import React from 'react';
import { useAppDispatch } from '@/utils/redux/hook';
import { setUser } from '@/utils/redux/userSlice';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ReduxChangeState({
    children,
    user,
}: {
    children: React.ReactNode;
    user: IBackendRes<IUser>;
}) {
    const dispatch = useAppDispatch();

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

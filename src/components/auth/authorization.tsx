import { handleGetUserDetail } from '@/utils/actions/actions';
import React from 'react';
import { redirect } from 'next/navigation';
import routes from '@/config/routes/routes';

export default async function Authorization({ children }: { children: React.ReactNode }) {
    // fetch api current user, if user don't exists, navigate to login
    const userCurrent = await handleGetUserDetail();

    if (!userCurrent.data) {
        redirect(routes.login.path);
    }

    return <>{children}</>;
}

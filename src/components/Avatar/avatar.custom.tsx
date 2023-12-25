import styles from './avatar.custom.module.scss';
import Avatar from '@mui/material/Avatar';

import React, { useState } from 'react';
import { FetchDefaltImages } from '@/utils/fetchImage';

export default function AvatarCustom({ user }: { user: IUser }) {
    const [fileError, setFileError] = useState<React.ReactNode | null>(null);

    console.log(fileError);

    return (
        <>
            <Avatar
                src={FetchDefaltImages(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/person/234.jpeg`,
                )}
            >
                {user?.username.charAt(0).toLocaleUpperCase()}
            </Avatar>
        </>
    );
}

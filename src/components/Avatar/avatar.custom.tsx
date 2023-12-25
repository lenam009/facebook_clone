import styles from './avatar.custom.module.scss';
import Avatar from '@mui/material/Avatar';

import React, { useState } from 'react';
import { FetchDefaltImages } from '@/utils/fetchImage';

export default function AvatarCustom({ user }: { user: IUser | null }) {
    const [fileError, setFileError] = useState<React.ReactNode | null>(null);

    return (
        <>
            <Avatar
                src={FetchDefaltImages(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/person/${user?.profilePicture}`,
                )}
            >
                {/* {user?.username.charAt(0).toLocaleUpperCase()} */}
                ccc
            </Avatar>
        </>
    );
}

import styles from './userFriend.button.module.scss';
import { useEffect, useState } from 'react';

import { Image, Typography } from 'antd';

// import userApi from '@/api/userApi';

const { Title } = Typography;

interface IPropsUserFriend {
    width?: string;
    user: IUser;
}
export default function ButtonUserFriend({
    width = 'calc(100% / 3)',
    user,
}: IPropsUserFriend) {
    return (
        <div className={styles['wrapper']} style={{ width: width }}>
            <Image
                width={'100%'}
                height={'120px'}
                preview={false}
                fallback="/user.png"
                src={
                    process.env.NEXT_PUBLIC_BACKEND_URL +
                    '/images/person/' +
                    user?.profilePicture
                }
                className={styles['image']}
            />
            <Title level={4} style={{ textAlign: 'center' }}>
                {user?.username}
            </Title>
        </div>
    );
}

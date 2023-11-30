import classNames from 'classnames/bind';
import styles from './ButtonUserFriend.module.scss';
import { useEffect, useState } from 'react';

import { Image, Typography } from 'antd';

import userApi from '@/api/userApi';
import { IUser } from '@/api/userApi';

const { Title } = Typography;

const cx = classNames.bind(styles);

const local = process.env.REACT_APP_PUBLIC_FOLDER_IMAGE;

interface IPropsUserFriend {
    width?: string;
    idUser?: string;
}
export default function ButtonUserFriend({
    width = 'calc(100% / 3)',
    idUser,
}: IPropsUserFriend) {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        if (idUser) userApi.getOneUser(idUser).then((res: any) => setUser(res));
    }, []);

    // console.log(local + 'person/' + user?.profilePicture);

    return (
        <div className={cx('wrapper')} style={{ width: width }}>
            <Image
                width={'100%'}
                height={'120px'}
                preview={false}
                fallback="/assets/person/2.jpeg"
                src={local + 'person/' + user?.profilePicture}
                className={cx('image')}
                // crossOrigin="anonymous"
            />
            <Title level={4} style={{ textAlign: 'center' }}>
                {user?.username}
            </Title>
        </div>
    );
}

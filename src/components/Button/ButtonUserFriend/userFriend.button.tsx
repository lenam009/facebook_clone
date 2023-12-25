import styles from './userFriend.button.module.scss';
import { useEffect, useState } from 'react';

import { Image, Typography } from 'antd';

// import userApi from '@/api/userApi';

const { Title } = Typography;

interface IPropsUserFriend {
    width?: string;
    idUser?: string;
}
export default function ButtonUserFriend({
    width = 'calc(100% / 3)',
    idUser,
}: IPropsUserFriend) {
    const [user, setUser] = useState<IUser | null>(null);

    const user1 = {
        _id: '657fb2b2902a695ddb00259c',
        username: 'admin',
        email: 'admin@gmail.com',
        profilePicture: '1.jpeg',
        coverPicture: '',
        followers: [],
        followings: ['6584304d7f0d80d9ee444605', '65843d9edfd97497a727581d'],
        isAdmin: true,
        desc: '',
        city: 'New York 123 456',
        from: '',
        createdAt: '2023-12-18T02:47:14.717Z',
        updatedAt: '2023-12-23T08:45:18.073Z',
        __v: 0,
    };

    useEffect(() => {
        // if (idUser) userApi.getOneUser(idUser).then((res: any) => setUser(res));
    }, []);

    // console.log(local + 'person/' + user?.profilePicture);

    return (
        <div className={styles['wrapper']} style={{ width: width }}>
            <Image
                width={'100%'}
                height={'120px'}
                preview={false}
                fallback="/assets/person/2.jpeg"
                src={
                    process.env.NEXT_PUBLIC_BACKEND_URL +
                    '/images/person/' +
                    user1?.profilePicture
                }
                className={styles['image']}
                // crossOrigin="anonymous"
            />
            <Title level={4} style={{ textAlign: 'center' }}>
                {user1?.username}
            </Title>
        </div>
    );
}

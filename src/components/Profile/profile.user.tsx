'use client';
import styles from './profile.user.module.scss';
import { useEffect, useState } from 'react';

import { Col, Row } from 'antd';

import LeftBar from '@/components/LeftBar/leftbar.home';
import Feed from '@/components/Feed/feed';
import Walkpaper from '@/components/Profile/Walkpaper/walkpaper.user';
import RightBarProfile from '@/components/Profile/RightBarProfile/rightBarProfile.user';
// import userApi from '@/api/userApi';
// import { useAppDispatch, useAppSelector } from '@/redux/hook';
// import { setUser, getUserCurrentSelector } from '@/redux/userSlice';

export default function ProfileUser() {
    const [user, setUser] = useState<IUser | null>(null);

    const user1 = {
        _id: '657fb2b2902a695ddb00259c',
        username: 'admin',
        email: 'admin@gmail.com',
        profilePicture: '',
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

    // const params = useParams();

    // const dispatch = useAppDispatch();
    // const user = useAppSelector(getUserCurrentSelector);

    useEffect(() => {
        // userApi.getOneUser('', params.username).then((res: any) => setUser(res));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Row className={styles['wrapper']}>
            <Col span={4}>
                <LeftBar />
            </Col>
            <Col span={20}>
                <Walkpaper user={user} />
                <Row>
                    <Col span={17}>
                        {user1?.username && <Feed user={user} home={false} />}
                    </Col>
                    <Col span={7}>
                        <RightBarProfile user={user} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

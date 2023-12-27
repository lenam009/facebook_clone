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

interface IProp {
    userRandom: IUser[] | undefined;
    userCurrentProfile: IUser | undefined;
    postsByUserId: IPost[] | undefined;
    usersFollowing: IUser[] | undefined;
}
export default function ProfileUser({
    userRandom,
    userCurrentProfile,
    postsByUserId,
    usersFollowing,
}: IProp) {
    return (
        <Row className={styles['wrapper']}>
            <Col span={4}>
                <LeftBar user={userRandom} />
            </Col>
            <Col span={20}>
                <Walkpaper user={userCurrentProfile} />
                <Row>
                    <Col span={17}>
                        <Feed
                            user={userCurrentProfile}
                            home={false}
                            posts={postsByUserId}
                        />
                    </Col>
                    <Col span={7}>
                        <RightBarProfile
                            user={userCurrentProfile}
                            usersFollowing={usersFollowing}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

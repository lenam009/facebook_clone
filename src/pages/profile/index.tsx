import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Col, Row } from 'antd';

import LeftBar from '@/components/layout/LeftBar';
import Feed from '@/components/layout/Feed';
import Walkpaper from '@/components/Walkpaper';
import RightBarProfile from '@/components/RightBarProfile';
import userApi from '@/api/userApi';
import { IUser } from '@/api/userApi';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setUser, getUserCurrentSelector } from '@/redux/userSlice';

const cx = classNames.bind(styles);

export default function Profile() {
    const [user, setUser] = useState<IUser | null>(null);
    const params = useParams();

    const dispatch = useAppDispatch();
    // const user = useAppSelector(getUserCurrentSelector);

    useEffect(() => {
        userApi.getOneUser('', params.username).then((res: any) => setUser(res));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Row className={cx('wrapper')}>
            <Col span={4}>
                <LeftBar />
            </Col>
            <Col span={20}>
                <Walkpaper user={user} />
                <Row>
                    <Col span={17}>{user?.username && <Feed user={user} home={false} />}</Col>
                    <Col span={7}>
                        <RightBarProfile user={user} />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

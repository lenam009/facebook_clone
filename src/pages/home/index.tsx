import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import { Col, Row } from 'antd';

import LeftBar from '@/components/layout/LeftBar';
import Feed from '@/components/layout/Feed';
import RightBar from '@/components/layout/RightBar';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setUser, getUserCurrentSelector } from '@/redux/userSlice';
import { Await, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';

const cx = classNames.bind(styles);

export default function Home() {
    const user = useAppSelector(getUserCurrentSelector);

    //@ts-ignore
    const { res } = useLoaderData();

    if (res) console.log('user1', res);

    console.log(123);
    return (
        <Row className={cx('wrapper')}>
            <Col span={4}>
                <LeftBar />
            </Col>
            <Col span={14}>{user && <Feed user={user} />}</Col>
            <Col span={6}>
                <RightBar />
            </Col>
        </Row>

        // <Suspense fallback={<h1>Loading</h1>}>
        //     {/* Await manages the deferred data (promise) */}
        //     <Await resolve={res}>
        //         {/* this calls back when the data is resolved */}
        //         {(resolvedHistory) => <h1>{JSON.stringify(resolvedHistory)}</h1>}
        //     </Await>
        // </Suspense>
    );
}

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import { Col, Row } from 'antd';

import LeftBar from '@/components/layout/LeftBar';
import Feed from '@/components/layout/Feed';
import RightBar from '@/components/layout/RightBar';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setUser, getUserCurrentSelector } from '@/redux/userSlice';

const cx = classNames.bind(styles);

export default function Home() {
    const user = useAppSelector(getUserCurrentSelector);

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
    );
}

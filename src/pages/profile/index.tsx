import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

import { Col, Row } from 'antd';

import LeftBar from '@/components/layout/LeftBar';
import Feed from '@/components/layout/Feed';
import Walkpaper from '@/components/Walkpaper';
import RightBarProfile from '@/components/RightBarProfile';

const cx = classNames.bind(styles);

export default function Profile() {
    return (
        <Row className={cx('wrapper')}>
            <Col span={4}>
                <LeftBar />
            </Col>
            <Col span={20}>
                <Walkpaper />
                <Row>
                    <Col span={17}>
                        <Feed />
                    </Col>
                    <Col span={7}>
                        <RightBarProfile />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

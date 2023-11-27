import classNames from 'classnames/bind';
import styles from './ContentFeed.module.scss';
import { ReactNode } from 'react';

import { Avatar, Flex, Input, Button } from 'antd';
import { UserOutlined, ClockCircleOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

export default function ContentFeed() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-input')}>
                <Flex>
                    <Avatar
                        icon={<UserOutlined />}
                        size={'large'}
                        src={'/assets/person/1.jpeg'}
                    />
                    <div>
                        <Flex style={{ padding: '0px 12px' }} vertical>
                            <h4>Title</h4>
                            <div>
                                <span className={cx('time')}>7 giờ&nbsp; </span>
                                <ClockCircleOutlined />
                            </div>
                        </Flex>
                    </div>
                </Flex>
            </div>
        </div>
    );
}

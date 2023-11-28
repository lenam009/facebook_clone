import classNames from 'classnames/bind';
import styles from './Walkpaper.module.scss';

import { Image, Avatar, Flex } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

export default function Walkpaper() {
    return (
        <div className={cx('wrapper')}>
            <Image
                width={'100%'}
                height={'250px'}
                className={cx('img')}
                alt="error"
                src="/assets/ad.png"
            />
            <Flex vertical align="center" className={cx('wrapper-avatar')}>
                <Avatar size={156} icon={<UserOutlined />} src="/assets/person/1.jpeg" />
                <h1 className={cx('name')}>Le nam 0000000000</h1>
                <p className={cx('desc')}>sssssssssssssssssssssss</p>
            </Flex>
        </div>
    );
}

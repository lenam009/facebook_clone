import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

import { Flex, Avatar } from 'antd';
import { AvatarSize } from 'antd/es/avatar/AvatarContext';

import { UserOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

export interface IProps {
    name: string;
    avatar: string;
    size?: AvatarSize;
    to?: string;
}

export default function AccountItem({ name, avatar, size = 'default' }: IProps) {
    return (
        <Flex className={cx('wrapper')} gap={20}>
            <Avatar size={size} className={cx('icon')} icon={<UserOutlined />} src={avatar} />

            <span className={cx('title')}>{name}</span>
        </Flex>
    );
}

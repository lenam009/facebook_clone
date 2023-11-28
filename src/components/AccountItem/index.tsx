import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

import { Flex, Avatar, Badge, ConfigProvider } from 'antd';
import { AvatarSize } from 'antd/es/avatar/AvatarContext';

import { UserOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

export interface IProps {
    name: string;
    avatar: string;
    size?: AvatarSize;
    to?: string;
    online?: boolean;
    shape?: 'circle' | 'square';
}

export default function AccountItem({
    name,
    avatar,
    size = 'default',
    online = false,
    shape = 'circle',
}: IProps) {
    return (
        <Flex className={cx('wrapper')} align="center" gap={20}>
            <ConfigProvider
                theme={{
                    components: {
                        Badge: {
                            dotSize: 12,
                        },
                    },
                }}
            >
                <Badge dot={online} offset={[-8, 7]} color="hsl(102, 53%, 61%)">
                    <Avatar
                        size={size}
                        className={cx('icon')}
                        icon={<UserOutlined />}
                        src={avatar}
                        shape={shape}
                    />
                </Badge>
            </ConfigProvider>

            <span className={cx('title')}>{name}</span>
        </Flex>
    );
}

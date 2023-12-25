import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import Link from 'next/link';

import { Flex, Avatar, Badge, ConfigProvider } from 'antd';
import { AvatarSize } from 'antd/es/avatar/AvatarContext';

import { UserOutlined } from '@ant-design/icons';
import routes from '@/config/routes/routes';

const cx = classNames.bind(styles);

export interface IProps {
    size?: AvatarSize;
    online?: boolean;
    shape?: 'circle' | 'square';
    user: IUser | null;
    key?: number;
}

export default function AccountItem({
    size = 'default',
    online = false,
    shape = 'circle',
    user = null,
}: IProps) {
    return (
        <>
            <Link href={routes.profile.prefix + '/' + user?.username}>
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
                                src={
                                    process.env.NEXT_PUBLIC_BACKEND_URL +
                                    '/images/person/' +
                                    user?.profilePicture
                                }
                                shape={shape}
                                // crossOrigin="anonymous"
                            />
                        </Badge>
                    </ConfigProvider>

                    <span className={cx('title')}>{user?.username}</span>
                </Flex>
            </Link>
        </>
    );
}

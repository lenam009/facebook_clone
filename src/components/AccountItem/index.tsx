import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { Link } from 'react-router-dom';

import { Flex, Avatar, Badge, ConfigProvider } from 'antd';
import { AvatarSize } from 'antd/es/avatar/AvatarContext';

import { UserOutlined } from '@ant-design/icons';
import { IUser } from '@/api/userApi';
import routes from '@/config/routes';

const cx = classNames.bind(styles);

const local = process.env.REACT_APP_PUBLIC_FOLDER_IMAGE;

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
            <Link to={routes.profile.prefix + '/' + user?.username}>
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
                                src={local + 'person/' + user?.profilePicture}
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

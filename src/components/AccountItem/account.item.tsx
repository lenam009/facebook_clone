import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import Link from 'next/link';

import { Flex, Badge, ConfigProvider } from 'antd';
import { AvatarSize } from 'antd/es/avatar/AvatarContext';
import AvatarCustom from '@/components/Avatar/avatar.custom';

import { UserOutlined } from '@ant-design/icons';
import routes from '@/config/routes/routes';
import { convertSlugUrl } from '@/utils/api';

const cx = classNames.bind(styles);

export interface IProps {
    size?: AvatarSize;
    online?: boolean;
    shape?: 'circle' | 'square';
    user: IUser | undefined;
    key?: string;
}

export default function AccountItem({
    size = 'default',
    online = false,
    shape = 'circle',
    user = undefined,
}: IProps) {
    return (
        <>
            <Link
                href={
                    routes.profile.prefix +
                    '/' +
                    convertSlugUrl(user?.username) +
                    '-' +
                    user?._id
                }
            >
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
                            <AvatarCustom user={user} />
                        </Badge>
                    </ConfigProvider>

                    <span className={cx('title')}>{user?.username}</span>
                </Flex>
            </Link>
        </>
    );
}

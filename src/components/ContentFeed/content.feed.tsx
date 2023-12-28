import styles from './ContentFeed.module.scss';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import routes from '@/config/routes/routes';
import dayjs from 'dayjs';
import AvatarCustom from '../Avatar/avatar.custom';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
    handleGetOneUserById,
    handleLikeOrDisLikePost,
    revalidateGetPostsFollowing,
} from '@/utils/actions/actions';
import { useRouter } from 'next/navigation';

dayjs.extend(relativeTime);

import { Flex, Button, Image, Divider, Popover, ConfigProvider, message } from 'antd';
import {
    ClockCircleOutlined,
    LikeFilled,
    HeartFilled,
    LikeOutlined,
    ShareAltOutlined,
    CommentOutlined,
    SmileOutlined,
    MehOutlined,
    FrownOutlined,
    DashOutlined,
} from '@ant-design/icons';
import { useAppSelector } from '@/utils/redux/hook';
import { getUserSelector } from '@/utils/redux/userSlice';
import { convertSlugUrl } from '@/utils/api';

const icons = [
    <LikeFilled style={{ color: 'blue' }} className={styles['iconHover']} />,
    <HeartFilled style={{ color: 'red' }} className={styles['iconHover']} />,
    <SmileOutlined style={{ color: 'pink' }} className={styles['iconHover']} />,
    <MehOutlined style={{ color: 'violet' }} className={styles['iconHover']} />,
    <FrownOutlined style={{ color: 'gray' }} className={styles['iconHover']} />,
];

export default function ContentFeed(post: IPost) {
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const router = useRouter();

    const userCurrent = useAppSelector(getUserSelector);

    useEffect(() => {
        const fetchUser = async () => {
            const userApi = await handleGetOneUserById(post.userId);
            if (userApi.data) {
                setUser(userApi.data);
            }
        };
        fetchUser();
    }, []);

    const handleClickLike = async (e: React.MouseEvent) => {
        const result = await handleLikeOrDisLikePost(post._id!);
        if (result.data) {
            revalidateGetPostsFollowing();
        } else {
            message.error(result.message);
        }
    };

    return (
        <div className={styles['wrapper']}>
            <Button type="text" shape="circle" className={styles['btnMenu']}>
                <DashOutlined />
            </Button>
            <Flex>
                <Link
                    href={
                        routes.profile.prefix +
                        '/' +
                        convertSlugUrl(user?.username) +
                        '-' +
                        user?._id
                    }
                >
                    <AvatarCustom user={user} />
                </Link>

                <div>
                    <Flex style={{ padding: '0px 12px' }} vertical>
                        <Link
                            href={
                                routes.profile.prefix +
                                '/' +
                                convertSlugUrl(user?.username) +
                                '-' +
                                user?._id
                            }
                            style={{ color: 'black' }}
                        >
                            <h4 className={styles['name']}>{user?.username}</h4>
                        </Link>
                        <div>
                            <span className={styles['time']}>
                                {dayjs(post.createdAt).fromNow()}
                                &nbsp;
                            </span>
                            <ClockCircleOutlined className={styles['clock']} />
                        </div>
                    </Flex>
                </div>
            </Flex>

            <p className={styles['desc']}>{post.desc}</p>

            {post.img && (
                <Image
                    height={400}
                    width={'calc(100% + 24px)'}
                    rootClassName={styles['image']}
                    fallback="/unknown.png"
                    src={process.env.NEXT_PUBLIC_BACKEND_URL + '/images/post/' + post.img}
                />
            )}

            {post.video && (
                <video width={'100%'} controls style={{ borderRadius: '4px' }}>
                    <source
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/videos/${post.video}`}
                        type="video/mp4"
                    />
                    Your browser does not support HTML video.
                </video>
            )}

            <Flex justify="space-between" className={styles['']}>
                <div>
                    <LikeFilled style={{ color: 'blue' }} className={styles['icon']} />
                    <HeartFilled style={{ color: 'red' }} className={styles['icon']} />
                    <span className={styles['text']}>{post.likes.length}</span>
                </div>
                <div>
                    <span className={styles['text']}>{'0'} bình luận</span>
                    <span className={styles['text']}>0 lượt chia sẻ</span>
                </div>
            </Flex>
            <Divider
                style={{ margin: '8px 0px 4px', backgroundColor: 'rgba(22,24,35,0.18)' }}
            />
            <Flex justify="space-between" className={styles['wraper-footer']}>
                <ConfigProvider
                    theme={{
                        components: {
                            Popover: {
                                marginXS: 0,
                            },
                        },
                    }}
                >
                    <Popover
                        placement="bottom"
                        title={icons.map((x, index) => (
                            <Button
                                key={index}
                                style={{ padding: '0' }}
                                type="text"
                                size="large"
                                shape="circle"
                                onClick={(e) => handleClickLike(e)}
                            >
                                <span style={{ fontSize: '2.2rem' }}>{x}</span>
                            </Button>
                        ))}
                    >
                        <Button
                            size="large"
                            type="text"
                            icon={<LikeOutlined />}
                            className={styles['btn']}
                            onClick={(e) => handleClickLike(e)}
                            style={{
                                color: post.likes.includes(
                                    userCurrent ? userCurrent?._id : '',
                                )
                                    ? 'blue'
                                    : 'black',
                            }}
                        >
                            Like
                        </Button>
                    </Popover>
                </ConfigProvider>
                <Button
                    size="large"
                    type="text"
                    icon={<CommentOutlined />}
                    className={styles['btn']}
                >
                    Bình luận
                </Button>
                <Button
                    size="large"
                    type="text"
                    icon={<ShareAltOutlined />}
                    className={styles['btn']}
                >
                    Share
                </Button>
            </Flex>
        </div>
    );
}

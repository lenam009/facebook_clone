import styles from './ContentFeed.module.scss';
// import { Users } from '@/data/dataFacebook';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import routes from '@/config/routes/routes';
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

import { Avatar, Flex, Button, Image, Divider, Popover, ConfigProvider } from 'antd';
import {
    UserOutlined,
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

// import userApi from '@/api/userApi';
// import postApi from '@/api/postApi';
// import { useAppSelector } from '@/redux/hook';
// import { getUserCurrentSelector } from '@/redux/userSlice';

const local = process.env.REACT_APP_PUBLIC_FOLDER_IMAGE;

const icons = [
    <LikeFilled style={{ color: 'blue' }} className={styles['iconHover']} />,
    <HeartFilled style={{ color: 'red' }} className={styles['iconHover']} />,
    <SmileOutlined style={{ color: 'pink' }} className={styles['iconHover']} />,
    <MehOutlined style={{ color: 'violet' }} className={styles['iconHover']} />,
    <FrownOutlined style={{ color: 'gray' }} className={styles['iconHover']} />,
];

const user = {
    _id: '657fb2b2902a695ddb00259c',
    username: 'admin',
    email: 'admin@gmail.com',
    profilePicture: '',
    coverPicture: '',
    followers: [],
    followings: ['6584304d7f0d80d9ee444605', '65843d9edfd97497a727581d'],
    isAdmin: true,
    desc: '',
    city: 'New York 123 456',
    from: '',
    createdAt: '2023-12-18T02:47:14.717Z',
    updatedAt: '2023-12-23T08:45:18.073Z',
    __v: 0,
};

export default function ContentFeed(post: IPost) {
    // const userCurrent = useAppSelector(getUserCurrentSelector);

    // const [user, setUser] = useState<IUser | null>(null);
    const [likes, setLikes] = useState<number>(post.likes.length);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    useEffect(() => {
        // const fetchUser = async () => {
        //     const user: any = await userApi.getOneUser(post.userId);
        //     setUser(user);
        //     if (userCurrent && userCurrent._id && post.likes.includes(userCurrent._id)) {
        //         setIsLiked(true);
        //     }
        // };
        // fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClickLike = (e: React.MouseEvent) => {
        // if (post._id && userCurrent && userCurrent?._id) {
        //     postApi.likeOrDislikePost(post._id, userCurrent?._id).then((res) => {
        //         setLikes(isLiked ? likes - 1 : likes + 1);
        //         setIsLiked(!isLiked);
        //     });
        // }
    };

    return (
        <div className={styles['wrapper']}>
            <Button type="text" shape="circle" className={styles['btnMenu']}>
                <DashOutlined />
            </Button>
            <Flex>
                <Link href={routes.profile.prefix + '/' + user?.username}>
                    <Avatar
                        icon={<UserOutlined />}
                        className={styles['avatar']}
                        size={'large'}
                        src={
                            process.env.NEXT_PUBLIC_BACKEND_URL +
                            '/images/person/' +
                            '2.jpeg'
                        }
                    />
                </Link>

                <div>
                    <Flex style={{ padding: '0px 12px' }} vertical>
                        <Link
                            href={routes.profile.prefix + '/' + user?.username}
                            style={{ color: 'black' }}
                        >
                            <h4 className={styles['name']}>{user?.username}</h4>
                        </Link>
                        <div>
                            <span className={styles['time']}>
                                {
                                    // @ts-ignore
                                    dayjs(post.createdAt).fromNow()
                                }
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
                    height={500}
                    width={'calc(100% + 24px)'}
                    rootClassName={styles['image']}
                    src={process.env.NEXT_PUBLIC_BACKEND_URL + '/images/post/' + '1.jpeg'}
                />
            )}
            <Flex justify="space-between" className={styles['']}>
                <div>
                    <LikeFilled style={{ color: 'blue' }} className={styles['icon']} />
                    <HeartFilled style={{ color: 'red' }} className={styles['icon']} />
                    <span className={styles['text']}>{likes}</span>
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
                            style={{ color: isLiked ? 'blue' : 'black' }}
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

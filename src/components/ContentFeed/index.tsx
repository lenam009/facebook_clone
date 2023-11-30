import classNames from 'classnames/bind';
import styles from './ContentFeed.module.scss';
// import { Users } from '@/data/dataFacebook';
import { useState, useEffect } from 'react';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import routes from '@/config/routes';

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

import { IPost } from '@/api/postApi';
import { IUser } from '@/api/userApi';
import userApi from '@/api/userApi';
import postApi from '@/api/postApi';
import { useAppSelector } from '@/redux/hook';
import { getUserCurrentSelector } from '@/redux/userSlice';

const cx = classNames.bind(styles);
const local = process.env.REACT_APP_PUBLIC_FOLDER_IMAGE;

const icons = [
    <LikeFilled style={{ color: 'blue' }} className={cx('iconHover')} />,
    <HeartFilled style={{ color: 'red' }} className={cx('iconHover')} />,
    <SmileOutlined style={{ color: 'pink' }} className={cx('iconHover')} />,
    <MehOutlined style={{ color: 'violet' }} className={cx('iconHover')} />,
    <FrownOutlined style={{ color: 'gray' }} className={cx('iconHover')} />,
];

// console.log(local);

const parseNewValueDate = (s: string): string => {
    switch (s) {
        case 'day':
        case 'days':
            return 'ngày';
        case 'month':
        case 'months':
            return 'tháng';
        case 'year':
        case 'years':
            return 'năm';
        case 'minutes':
        case 'minute':
            return 'phút';
        case 'hours':
        case 'hour':
            return 'giờ';
        case 'second':
        case 'seconds':
            return 'giây';
        default:
            return '';
    }
};

const parseDate = (date: string): string => {
    const startSpace = date.indexOf(' ');
    const endSpace = date.lastIndexOf(' ');
    const oldValue = date.substring(startSpace + 1, endSpace);
    const newValue = parseNewValueDate(oldValue);
    console.log(oldValue);

    return date.replace(oldValue.concat(' ', 'ago'), newValue.concat(' ', 'trước'));
};

interface IProp extends IPost {
    profileUsername?: string;
}
export default function ContentFeed(post: IProp) {
    const userCurrent = useAppSelector(getUserCurrentSelector);

    const [user, setUser] = useState<IUser | null>(null);
    const [likes, setLikes] = useState<number>(post.likes.length);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            const user: any = await userApi.getOneUser(post.userId);

            setUser(user);

            if (userCurrent && userCurrent._id && post.likes.includes(userCurrent._id)) {
                setIsLiked(true);
            }
        };
        fetchUser();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClickLike = (e: React.MouseEvent) => {
        if (post._id && userCurrent && userCurrent?._id) {
            postApi.likeOrDislikePost(post._id, userCurrent?._id).then((res) => {
                setLikes(isLiked ? likes - 1 : likes + 1);
                setIsLiked(!isLiked);
            });
        }
    };

    console.log(
        user?.profilePicture ? user.username : '',
        user?.profilePicture ? local + 'person/' + user.profilePicture : '',
    );

    return (
        <div className={cx('wrapper')}>
            <Button type="text" shape="circle" className={cx('btnMenu')}>
                <DashOutlined />
            </Button>
            <Flex>
                <Link to={routes.profile.prefix + '/' + user?.username}>
                    <Avatar
                        icon={<UserOutlined />}
                        className={cx('avatar')}
                        size={'large'}
                        crossOrigin="anonymous"
                        src={local + 'person/' + user?.profilePicture}
                    />
                </Link>

                <div>
                    <Flex style={{ padding: '0px 12px' }} vertical>
                        <Link
                            to={routes.profile.prefix + '/' + user?.username}
                            style={{ color: 'black' }}
                        >
                            <h4 className={cx('name')}>{user?.username}</h4>
                        </Link>
                        <div>
                            <span className={cx('time')}>
                                {parseDate(format(post.createdAt))} &nbsp;
                            </span>
                            <ClockCircleOutlined className={cx('clock')} />
                        </div>
                    </Flex>
                </div>
            </Flex>
            <p className={cx('desc')}>{post.desc}</p>
            {post.img && (
                <Image
                    height={500}
                    width={'calc(100% + 24px)'}
                    rootClassName={cx('image')}
                    src={local + 'post/' + post.img}
                />
            )}
            <Flex justify="space-between" className={cx('')}>
                <div>
                    <LikeFilled style={{ color: 'blue' }} className={cx('icon')} />
                    <HeartFilled style={{ color: 'red' }} className={cx('icon')} />
                    <span className={cx('text')}>{likes}</span>
                </div>
                <div>
                    <span className={cx('text')}>{'0'} bình luận</span>
                    <span className={cx('text')}>0 lượt chia sẻ</span>
                </div>
            </Flex>
            <Divider
                style={{ margin: '8px 0px 4px', backgroundColor: 'rgba(22,24,35,0.18)' }}
            />
            <Flex justify="space-between" className={cx('wraper-footer')}>
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
                                style={{ padding: '0 6px' }}
                                type="text"
                                size="large"
                                shape="circle"
                                onClick={(e) => handleClickLike(e)}
                            >
                                {x}
                            </Button>
                        ))}
                    >
                        <Button
                            size="large"
                            type="text"
                            icon={<LikeOutlined />}
                            className={cx('btn')}
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
                    className={cx('btn')}
                >
                    Bình luận
                </Button>
                <Button
                    size="large"
                    type="text"
                    icon={<ShareAltOutlined />}
                    className={cx('btn')}
                >
                    Share
                </Button>
            </Flex>
        </div>
    );
}

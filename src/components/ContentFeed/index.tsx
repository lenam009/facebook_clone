import classNames from 'classnames/bind';
import styles from './ContentFeed.module.scss';
import { Users } from '@/data/dataFacebook';
import { useState } from 'react';

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

import { IPropsContentFeed } from '@/data/dataFacebook';

const cx = classNames.bind(styles);

const icons = [
    <LikeFilled style={{ color: 'blue' }} className={cx('iconHover')} />,
    <HeartFilled style={{ color: 'red' }} className={cx('iconHover')} />,
    <SmileOutlined style={{ color: 'pink' }} className={cx('iconHover')} />,
    <MehOutlined style={{ color: 'violet' }} className={cx('iconHover')} />,
    <FrownOutlined style={{ color: 'gray' }} className={cx('iconHover')} />,
];

export default function ContentFeed(props: IPropsContentFeed) {
    const [likes, setLikes] = useState<number>(props.like);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const user = Users.find((x) => x.id === props.userId);

    const handleClickLike = (e: React.MouseEvent) => {
        setLikes(isLiked ? likes - 1 : likes + 1);
        setIsLiked(!isLiked);
    };

    return (
        <div className={cx('wrapper')}>
            <Button type="text" shape="circle" className={cx('btnMenu')}>
                <DashOutlined />
            </Button>
            <Flex>
                <Avatar
                    icon={<UserOutlined />}
                    className={cx('avatar')}
                    size={'large'}
                    src={user?.profilePicture}
                />
                <div>
                    <Flex style={{ padding: '0px 12px' }} vertical>
                        <h4 className={cx('name')}>{user?.username}</h4>
                        <div>
                            <span className={cx('time')}>{props.date}&nbsp; </span>
                            <ClockCircleOutlined className={cx('clock')} />
                        </div>
                    </Flex>
                </div>
            </Flex>
            <p className={cx('desc')}>{props.desc}</p>
            <Image
                src={props.photo}
                height={500}
                width={'calc(100% + 24px)'}
                rootClassName={cx('image')}
            />
            <Flex justify="space-between" className={cx('')}>
                <div>
                    <LikeFilled style={{ color: 'blue' }} className={cx('icon')} />
                    <HeartFilled style={{ color: 'red' }} className={cx('icon')} />
                    <span className={cx('text')}>{likes}</span>
                </div>
                <div>
                    <span className={cx('text')}>{props.comment} bình luận</span>
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

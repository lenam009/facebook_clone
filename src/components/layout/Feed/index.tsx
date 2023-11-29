import classNames from 'classnames/bind';
import styles from './Feed.module.scss';
import { useState, useEffect } from 'react';

import { Flex } from 'antd';

import Share from '@/components/Share';
import ContentFeed from '@/components/ContentFeed';
import { IPost } from '@/api/postApi';
import { useAppSelector } from '@/redux/hook';
import { getUserCurrentSelector } from '@/redux/userSlice';
import postApi from '@/api/postApi';
import { IUser } from '@/api/userApi';

const cx = classNames.bind(styles);

interface IProp {
    user: IUser | null;
    home?: boolean;
}
export default function Feed({ user, home = true }: IProp) {
    const [posts, setPosts] = useState<IPost[]>([]);

    const userCurrent = useAppSelector(getUserCurrentSelector);

    // !user
    // ? '6562c4fb86bb7cc1bef81959'
    // : user._id
    // ? user._id
    // : '6562c4fb86bb7cc1bef81959',

    useEffect(() => {
        const fetchPost = async () => {
            const data: any = !home
                ? await postApi.getPostByUsername(
                      !user ? '' : user.username ? user?.username : '',
                  )
                : await postApi.getPostByFollowing(
                      !userCurrent ? '' : userCurrent?._id ? userCurrent?._id : '',
                  );

            setPosts(data);
        };
        fetchPost();
    }, []);

    return (
        <Flex vertical align="center" className={cx('wrapper')}>
            <Share user={user} />
            {posts.map((x) => (
                <ContentFeed
                    key={x._id}
                    _id={x._id}
                    desc={x.desc}
                    likes={x.likes}
                    userId={x.userId}
                    img={x.img}
                    createdAt={x.createdAt}
                    updatedAt={x.updatedAt}
                    profileUsername={user?.username}
                />
            ))}
        </Flex>
    );
}

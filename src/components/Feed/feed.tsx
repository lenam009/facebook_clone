'use client';
import styles from './Feed.module.scss';
import { useState, useEffect } from 'react';

import { Flex } from 'antd';

import Share from '@/components/Home/Share/share';
import ContentFeed from '@/components/ContentFeed/content.feed';
// import { useAppSelector } from '@/redux/hook';
// import { getUserCurrentSelector } from '@/redux/userSlice';
// import postApi from '@/api/postApi';

interface IProp {
    user: IUser | null;
    home?: boolean;
}

const posts = [
    {
        _id: '658430937f0d80d9ee44460c',
        userId: '6584304d7f0d80d9ee444605',
        desc: 'This a create Post of lenam009',
        img: 'image_1',
        likes: [],
        createdAt: '2023-12-21T12:33:23.995Z',
        updatedAt: '2023-12-21T13:01:42.813Z',
        __v: 0,
    },
    {
        _id: '6584342ee9ac753acb8000cd',
        userId: '6584304d7f0d80d9ee444605',
        desc: 'This a create Post of admin_1 lan 0',
        img: 'image_1',
        likes: [],
        createdAt: '2023-12-21T12:48:46.950Z',
        updatedAt: '2023-12-21T12:48:46.950Z',
        __v: 0,
    },
];

export default function Feed({ user, home = true }: IProp) {
    // const [posts, setPosts] = useState<IPost[]>([]);

    // const userCurrent = useAppSelector(getUserCurrentSelector);

    // !user
    // ? '6562c4fb86bb7cc1bef81959'
    // : user._id
    // ? user._id
    // : '6562c4fb86bb7cc1bef81959',

    useEffect(() => {
        // const fetchPost = async () => {
        //     const data: any = !home
        //         ? await postApi.getPostByUsername(
        //               !user ? '' : user.username ? user?.username : '',
        //           )
        //         : await postApi.getPostByFollowing(
        //               !userCurrent ? '' : userCurrent?._id ? userCurrent?._id : '',
        //           );
        //     setPosts(data);
        // };
        // fetchPost();
    }, []);

    return (
        <Flex vertical align="center" className={styles['wrapper']}>
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
                    // profileUsername={user?.username}
                />
            ))}
        </Flex>
    );
}

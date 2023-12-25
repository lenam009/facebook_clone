import styles from './rightBarProfile.user.module.scss';
import { useState, useEffect } from 'react';

import ButtonUserFriend from '@/components/Button/ButtonUserFriend/userFriend.button';
// import { getUserCurrentSelector } from '@/redux/userSlice';
// import { useAppSelector } from '@/redux/hook';
import { Flex, Button, message } from 'antd';
// import userApi from '@/api/userApi';

interface IProp {
    user: IUser | null;
}
export default function RightBarProfile({ user }: IProp) {
    const [messageApi, contextHolder] = message.useMessage();

    const user1: IUser = {
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

    // const userCurrent = useAppSelector(getUserCurrentSelector);
    const [isFollow, setIsFollow] = useState<boolean>(false);

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Thất bại',
        });
    };

    const success = () => {
        messageApi.open({
            type: 'success',
            content: isFollow ? 'Unfollow thành công' : 'Follow thành công',
        });
    };

    // useEffect(() => {
    //     if (userCurrent && user && user._id) {
    //         setIsFollow(userCurrent?.followings.includes(user?._id));
    //     }
    // }, [user, userCurrent]);

    const handleOnClickFollowOrUnfollow = () => {
        // if (userCurrent && userCurrent._id && user && user._id) {
        //     userApi
        //         .followOrUnfollow(!isFollow, userCurrent?._id, user?._id)
        //         .then(() => {
        //             success();
        //             setIsFollow(!isFollow);
        //         })
        //         .catch(() => error());
        // }
    };

    return (
        <div style={{ width: '100%' }} className={styles['wrapper']}>
            {contextHolder}
            <div>
                {/* {user?._id !== userCurrent?._id && (
                    <Button onClick={handleOnClickFollowOrUnfollow} type="primary">
                        {isFollow ? 'Unfollow' : 'Follow'}
                    </Button>
                )} */}
                <Button onClick={handleOnClickFollowOrUnfollow} type="primary">
                    {isFollow ? 'Unfollow' : 'Follow'}
                </Button>
                <h3 style={{ fontSize: '2rem' }}>Thông tin người dùng</h3>
                <p className={styles['content-user']}>
                    <span className={styles['label']}>Thành phố:&nbsp;</span>
                    <span className={styles['information']}>{user1?.city}</span>
                </p>
                <p className={styles['content-user']}>
                    <span className={styles['label']}>Quê quán:&nbsp;</span>
                    <span className={styles['information']}>{user1?.from}</span>
                </p>
                <p className={styles['content-user']}>
                    <span className={styles['label']}>Mối quan hệ:&nbsp;</span>
                    <span className={styles['information']}>
                        {user1?.relationship === 1
                            ? 'Độc thân'
                            : user1?.relationship === 2
                            ? 'Đã kết hôn'
                            : '-'}
                    </span>
                </p>
            </div>
            <div style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '2rem' }}>Bạn của người dùng</h3>
                <Flex wrap="wrap" style={{ marginLeft: '-8px' }}>
                    {user1?.followings.map((x) => (
                        <ButtonUserFriend idUser={x} />
                    ))}
                </Flex>
            </div>
        </div>
    );
}

import styles from './rightBarProfile.user.module.scss';
import { useState, useEffect } from 'react';

import ButtonUserFriend from '@/components/Button/ButtonUserFriend/userFriend.button';
// import { getUserCurrentSelector } from '@/redux/userSlice';
// import { useAppSelector } from '@/redux/hook';
import { Flex, Button, message } from 'antd';
import { useAppSelector } from '@/utils/redux/hook';
import { getUserSelector } from '@/utils/redux/userSlice';
import {
    handleFollowOrUnfollowUserAction,
    revalidateGetOneUseById,
} from '@/utils/actions/actions';
import Link from 'next/link';
import routes from '@/config/routes/routes';
import { convertSlugUrl } from '@/utils/api';

// import userApi from '@/api/userApi';

interface IProp {
    user: IUser | undefined;
    usersFollowing: IUser[] | undefined;
}
export default function RightBarProfile({ user, usersFollowing }: IProp) {
    const userCurrent = useAppSelector(getUserSelector);

    // const userCurrent = useAppSelector(getUserCurrentSelector);
    const [isFollow, setIsFollow] = useState<boolean>(
        userCurrent!.followings.includes(user?._id!),
    );

    const handleOnClickFollowOrUnfollow = async () => {
        const result = await handleFollowOrUnfollowUserAction(user?._id!, !isFollow);

        if (result.data) {
            setIsFollow(!isFollow);
            revalidateGetOneUseById();
            message.success(result.message);
        } else {
            message.error(result.message);
        }
    };

    return (
        <div style={{ width: '100%' }} className={styles['wrapper']}>
            <div>
                {user?._id !== userCurrent?._id && (
                    <Button onClick={handleOnClickFollowOrUnfollow} type="primary">
                        {userCurrent?.followings.includes(user?._id!)
                            ? 'Unfollow'
                            : 'Follow'}
                    </Button>
                )}

                <h3 style={{ fontSize: '2rem' }}>Thông tin người dùng</h3>
                <p className={styles['content-user']}>
                    <span className={styles['label']}>Thành phố:&nbsp;</span>
                    <span className={styles['information']}>
                        {user?.city === '' ? 'Không rõ' : user?.city}
                    </span>
                </p>
                <p className={styles['content-user']}>
                    <span className={styles['label']}>Quê quán:&nbsp;</span>
                    <span className={styles['information']}>
                        {user?.from === '' ? 'Không rõ' : user?.from}
                    </span>
                </p>
                <p className={styles['content-user']}>
                    <span className={styles['label']}>Mối quan hệ:&nbsp;</span>
                    <span className={styles['information']}>
                        {user?.relationship === 1
                            ? 'Độc thân'
                            : user?.relationship === 2
                            ? 'Đã kết hôn'
                            : 'Không rõ'}
                    </span>
                </p>
            </div>
            {usersFollowing?.length !== 0 && (
                <div style={{ marginTop: '24px' }}>
                    <h3 style={{ fontSize: '2rem' }}>
                        {userCurrent?._id === user?._id ? 'Bạn' : user?.username} đang
                        theo dõi
                    </h3>
                    <Flex wrap="wrap" style={{ marginLeft: '-8px' }}>
                        {usersFollowing?.map((x) => (
                            <Link
                                key={x._id}
                                href={
                                    routes.profile.prefix +
                                    '/' +
                                    convertSlugUrl(x?.username) +
                                    '-' +
                                    x?._id
                                }
                                style={{ width: 'calc(100% / 3)' }}
                            >
                                <ButtonUserFriend user={x} width="100%" />
                            </Link>
                        ))}
                    </Flex>
                </div>
            )}
        </div>
    );
}

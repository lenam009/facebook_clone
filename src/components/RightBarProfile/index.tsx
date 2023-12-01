import classNames from 'classnames/bind';
import styles from './RightBarProfile.module.scss';
import { useState, useEffect } from 'react';

import ButtonUserFriend from 'components/Button/ButtonUserFriend';
import { getUserCurrentSelector } from '@/redux/userSlice';
import { useAppSelector } from '@/redux/hook';
import { Flex, Button, message } from 'antd';
import userApi, { IUser } from '@/api/userApi';

const cx = classNames.bind(styles);

interface IProp {
    user: IUser | null;
}
export default function RightBarProfile({ user }: IProp) {
    const [messageApi, contextHolder] = message.useMessage();

    const userCurrent = useAppSelector(getUserCurrentSelector);
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

    useEffect(() => {
        if (userCurrent && user && user._id) {
            setIsFollow(userCurrent?.followings.includes(user?._id));
        }
    }, [user, userCurrent]);

    const handleOnClickFollowOrUnfollow = () => {
        if (userCurrent && userCurrent._id && user && user._id) {
            userApi
                .followOrUnfollow(!isFollow, userCurrent?._id, user?._id)
                .then(() => {
                    success();
                    setIsFollow(!isFollow);
                })
                .catch(() => error());
        }
    };

    return (
        <div style={{ width: '100%' }}>
            {contextHolder}
            <div>
                {user?._id !== userCurrent?._id && (
                    <Button onClick={handleOnClickFollowOrUnfollow} type="primary">
                        {isFollow ? 'Unfollow' : 'Follow'}
                    </Button>
                )}
                <h3 style={{ fontSize: '2rem' }}>Thông tin người dùng</h3>
                <p className={cx('content-user')}>
                    <span className={cx('label')}>Thành phố:&nbsp;</span>
                    <span className={cx('information')}>{user?.city}</span>
                </p>
                <p className={cx('content-user')}>
                    <span className={cx('label')}>Quê quán:&nbsp;</span>
                    <span className={cx('information')}>{user?.from}</span>
                </p>
                <p className={cx('content-user')}>
                    <span className={cx('label')}>Mối quan hệ:&nbsp;</span>
                    <span className={cx('information')}>
                        {user?.relationship === 1
                            ? 'Độc thân'
                            : user?.relationship === 2
                            ? 'Đã kết hôn'
                            : '-'}
                    </span>
                </p>
            </div>
            <div style={{ marginTop: '24px' }}>
                <h3 style={{ fontSize: '2rem' }}>Bạn của người dùng</h3>
                <Flex wrap="wrap" style={{ marginLeft: '-8px' }}>
                    {user?.followings.map((x) => (
                        <ButtonUserFriend idUser={x} />
                    ))}
                </Flex>
            </div>
        </div>
    );
}

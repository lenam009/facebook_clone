import classNames from 'classnames/bind';
import styles from './RightBarProfile.module.scss';
import { useAppSelector } from '@/redux/hook';
import { getUserCurrentSelector } from '@/redux/userSlice';

import ButtonUserFriend from 'components/Button/ButtonUserFriend';
import { Flex } from 'antd';

const cx = classNames.bind(styles);

export default function RightBarProfile() {
    const user = useAppSelector(getUserCurrentSelector);

    return (
        <div style={{ width: '100%' }}>
            <div>
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
                    <ButtonUserFriend />
                    <ButtonUserFriend />
                    <ButtonUserFriend />
                    <ButtonUserFriend />
                </Flex>
            </div>
        </div>
    );
}

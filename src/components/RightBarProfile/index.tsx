import classNames from 'classnames/bind';
import styles from './RightBarProfile.module.scss';

import ButtonUserFriend from 'components/Button/ButtonUserFriend';
import { Flex } from 'antd';

const cx = classNames.bind(styles);

export default function RightBarProfile() {
    return (
        <div style={{ width: '100%' }}>
            <div>
                <h3 style={{ fontSize: '2rem' }}>Thông tin người dùng</h3>
                <p className={cx('content-user')}>
                    <span className={cx('label')}>City:&nbsp;</span>
                    <span className={cx('information')}>New York</span>
                </p>
                <p className={cx('content-user')}>
                    <span className={cx('label')}>From:&nbsp;</span>
                    <span className={cx('information')}>New York</span>
                </p>
                <p className={cx('content-user')}>
                    <span className={cx('label')}>Relationship:&nbsp;</span>
                    <span className={cx('information')}>New York</span>
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

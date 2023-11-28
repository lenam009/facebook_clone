import classNames from 'classnames/bind';
import styles from './ButtonUserFriend.module.scss';

import { Image, Typography } from 'antd';
const { Title } = Typography;

const cx = classNames.bind(styles);

interface IPropsUserFriend {
    width?: string;
}
export default function ButtonUserFriend({ width }: IPropsUserFriend) {
    return (
        <div className={cx('wrapper')} style={{ width: width }}>
            <Image
                width={'100%'}
                height={'120px'}
                preview={false}
                fallback="/assets/person/2.jpeg"
                src="/assets/person/1.jpeg"
                className={cx('image')}
            />
            <Title level={4} style={{ textAlign: 'center', letterSpacing: '1px' }}>
                John cater
            </Title>
        </div>
    );
}

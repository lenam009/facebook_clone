import classNames from 'classnames/bind';
import styles from './ButtonRightBarAd.module.scss';

import { Flex } from 'antd';

const cx = classNames.bind(styles);

interface IProps {
    image: string;
    title: string;
    desc: string;
}
export default function ButtonRightBarAd({ image = '/assets/ad.png', title, desc }: IProps) {
    return (
        <Flex gap={10} align="center" className={cx('wrapper')}>
            <img src={image} className={cx('image')} alt="error" />
            <div>
                <h4 className={cx('title')}>{title}</h4>
                <span className={cx('desc')}>{desc}</span>
            </div>
        </Flex>
    );
}

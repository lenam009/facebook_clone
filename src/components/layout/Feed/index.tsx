import classNames from 'classnames/bind';
import styles from './Feed.module.scss';

import { Flex } from 'antd';

import Share from '@/components/Share';
import ContentFeed from '@/components/ContentFeed';

const cx = classNames.bind(styles);

export default function Feed() {
    return (
        <Flex vertical align="center" className={cx('wrapper')}>
            <Share />
            <ContentFeed />
        </Flex>
    );
}

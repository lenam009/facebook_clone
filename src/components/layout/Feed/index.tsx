import classNames from 'classnames/bind';
import styles from './Feed.module.scss';

import { Flex } from 'antd';

import Share from '@/components/Share';
import ContentFeed from '@/components/ContentFeed';
import { Posts } from '@/data/dataFacebook';

const cx = classNames.bind(styles);

export default function Feed() {
    return (
        <Flex vertical align="center" className={cx('wrapper')}>
            <Share />
            {Posts.map((x) => (
                <ContentFeed
                    key={x.id}
                    id={x.id}
                    comment={x.comment}
                    date={x.date}
                    like={x.like}
                    photo={x.photo}
                    userId={x.userId}
                    desc={x.desc}
                />
            ))}
        </Flex>
    );
}

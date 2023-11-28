import classNames from 'classnames/bind';
import styles from './Share.module.scss';
import { ReactNode } from 'react';

import { Avatar, Flex, Input, Button } from 'antd';
import {
    UserOutlined,
    SnippetsOutlined,
    TagOutlined,
    EnvironmentOutlined,
    SmileOutlined,
} from '@ant-design/icons';

const cx = classNames.bind(styles);

const items: {
    title: string;
    icon: ReactNode;
}[] = [
    {
        title: 'Photo or Video',
        icon: <SnippetsOutlined style={{ color: 'red' }} />,
    },
    {
        title: 'Tag',
        icon: <TagOutlined style={{ color: 'blue' }} />,
    },
    {
        title: 'Location',
        icon: <EnvironmentOutlined style={{ color: 'green' }} />,
    },
    {
        title: 'Feeling',
        icon: <SmileOutlined style={{ color: 'yellow' }} />,
    },
];

export default function Share() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-input')}>
                <Flex>
                    <Avatar
                        icon={<UserOutlined />}
                        size={'large'}
                        src={'/assets/person/1.jpeg'}
                    />
                    <Input
                        style={{ fontSize: '1.8rem' }}
                        placeholder="Bạn đang nghĩ gì thế?"
                        bordered={false}
                    />
                </Flex>
            </div>
            <div
                style={{
                    padding: '0px 12px',
                    marginTop: '20px',
                }}
            >
                <hr style={{ borderColor: 'rgba(22,24,35,0.05)' }} />
            </div>
            <div className={cx('list-button')}>
                <Flex justify="space-between" align="center" style={{ padding: '0 12px' }}>
                    {items.map((x, index) => (
                        <Button
                            style={{ padding: '0px 12px' }}
                            size="large"
                            className={cx('button')}
                            type="text"
                            icon={x.icon}
                            key={index}
                        >
                            {x.title}
                        </Button>
                    ))}
                    <Button type="primary">Share</Button>
                </Flex>
            </div>
        </div>
    );
}

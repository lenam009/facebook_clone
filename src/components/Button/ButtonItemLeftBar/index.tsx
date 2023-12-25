import classNames from 'classnames/bind';
import styles from './ButtonItemLeftBar.module.scss';
import { ReactNode } from 'react';

import { Flex } from 'antd';

const cx = classNames.bind(styles);

interface IProps {
    title: string;
    icon: ReactNode;
    to?: string;
}

export default function ButtonItemLeftBar({ title, icon }: IProps) {
    return (
        <Flex className={cx('wrapper')} gap={20}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('title')}>{title}</span>
        </Flex>
    );
}

import classNames from 'classnames/bind';
import styles from './ButtonItemLeftBar.module.scss';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { Flex } from 'antd';

import { FacebookFilled } from '@ant-design/icons';

const cx = classNames.bind(styles);

export interface IProps {
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

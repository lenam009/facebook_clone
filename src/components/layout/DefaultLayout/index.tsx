import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import Header from '@/components/Header';
import { ReactNode } from 'react';
import { AxiosRequestHandler } from '@/api';

const cx = classNames.bind(styles);

interface IProps {
    children: ReactNode;
}

export default function DefaultLayout({ children }: IProps) {
    return (
        <>
            <div>
                <Header />
                <div className={cx('wrapper-children')}>{children}</div>
            </div>
        </>
    );
}

import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ButtonHeaderTab.module.scss';
import { ReactNode } from 'react';
import { useState, useEffect } from 'react';

import { Badge } from 'antd';

import routes from '@/config/routes';

const cx = classNames.bind(styles);

interface IProps {
    to: string;
    children?: ReactNode;
    icon?: ReactNode;
    badge?: number;
}
export default function ButtonHeaderTab({ children, to, icon, badge }: IProps) {
    const [tab, setTab] = useState(routes.home);

    useEffect(() => {
        setTab(window.location.pathname);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.pathname]);
    return (
        <Link className={cx('link', icon && 'icon', tab === to && 'active')} to={to}>
            <>
                <Badge count={badge}>
                    <span style={{ fontSize: '2rem' }} className={cx(tab === to && 'active')}>
                        {children ?? icon}
                    </span>
                </Badge>
            </>
        </Link>
    );
}

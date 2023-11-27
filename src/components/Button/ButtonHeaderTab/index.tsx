import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ButtonHeaderTab.module.scss';
import { ReactNode } from 'react';
import { useState, useEffect } from 'react';

import routes from '@/config/routes';

const cx = classNames.bind(styles);

interface IProps {
    children?: ReactNode;
    to: string;
    icon?: ReactNode;
}
export default function ButtonHeaderTab({ children, to, icon }: IProps) {
    const [tab, setTab] = useState(routes.home);

    useEffect(() => {
        setTab(window.location.pathname);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.pathname]);
    return (
        <Link className={cx('link', icon && 'icon', tab === to && 'active')} to={to}>
            <span>{children ?? icon}</span>
        </Link>
    );
}

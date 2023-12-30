import { Link, NavLink, useMatch } from 'react-router-dom';
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

    const match = useMatch(routes.profile);

    console.log('match', match);

    useEffect(() => {
        setTab(window.location.pathname);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.pathname]);
    return (
        <NavLink
            style={({ isActive, isPending }) => {
                return {
                    color: isActive ? 'red' : 'inherit',
                };
            }}
            className={({ isActive, isPending }) => {
                const result = isActive ? 'active' : isPending ? 'pending' : '';
                return cx('link', result);
            }}
            to={to}
        >
            <Badge count={badge}>
                <span style={{ fontSize: '2rem' }} className={cx(tab === to && 'active')}>
                    {children ?? icon}
                </span>
            </Badge>
        </NavLink>
    );
}

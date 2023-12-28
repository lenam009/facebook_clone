import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './ButtonHeaderTab.module.scss';
import { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { Badge } from 'antd';

import routes from '@/config/routes/routes';

const cx = classNames.bind(styles);

interface IProps {
    to: string;
    children?: ReactNode;
    icon?: ReactNode;
    badge?: number;
}
export default function ButtonHeaderTab({ children, to, icon, badge }: IProps) {
    const [tab, setTab] = useState(routes.home.path);
    const pathname = usePathname();

    useEffect(() => {
        if (pathname.includes(routes.profile.prefix)) to = pathname;

        setTab(pathname);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <Link className={cx('link', icon && 'icon')} href={to}>
            <>
                <Badge count={badge}>
                    <span
                        style={{ fontSize: '2rem' }}
                        className={cx(
                            (tab === to ||
                                (tab.includes(routes.profile.prefix) &&
                                    to.includes(routes.profile.prefix))) &&
                                'active',
                        )}
                    >
                        {children ?? icon}
                    </span>
                </Badge>
            </>
        </Link>
    );
}

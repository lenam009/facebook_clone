import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './ButtonHeaderTab.module.scss';
import { ReactNode } from 'react';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { useRouter } from 'next/navigation';

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
    const pathname = usePathname();
    // const router = useRouter();
    // const segment = useSelectedLayoutSegment();

    // console.log('pathname', pathname);

    const tab =
        pathname === to ||
        (pathname.includes(routes.profile.prefix) && to.includes(routes.profile.prefix));

    return (
        <Link className={cx('link', icon && 'icon')} href={to}>
            <>
                <Badge count={badge}>
                    <span style={{ fontSize: '2rem' }} className={cx(tab && 'active')}>
                        {children ?? icon}
                    </span>
                </Badge>
            </>
        </Link>
    );
}

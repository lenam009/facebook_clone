import classNames from 'classnames/bind';
import styles from './LeftBar.module.scss';
import { useEffect, useState } from 'react';

import { Button, Divider } from 'antd';
import {
    WifiOutlined,
    WechatOutlined,
    VideoCameraFilled,
    UsergroupAddOutlined,
    FileMarkdownFilled,
    QuestionCircleFilled,
    AccountBookOutlined,
    CalendarOutlined,
    CodepenCircleOutlined,
} from '@ant-design/icons';

import ButtonItemLeftBar from '@/components/Button/ButtonItemLeftBar';
import AccountItem from '@/components/AccountItem';
import { IProps } from '@/components/Button/ButtonItemLeftBar';
import { IUser } from '@/api/userApi';
import userApi from '@/api/userApi';

const cx = classNames.bind(styles);

const items: IProps[] = [
    {
        icon: <WifiOutlined />,
        title: 'Feed',
    },
    {
        icon: <WechatOutlined style={{ color: 'rgba(175,20,209,1)' }} />,
        title: 'Chats',
    },
    {
        icon: <VideoCameraFilled style={{ color: 'rgb(58,214,21)' }} />,
        title: 'Videos',
    },
    {
        icon: <UsergroupAddOutlined style={{ color: 'rgb(14,172,198)' }} />,
        title: 'Groups',
    },
    {
        icon: <FileMarkdownFilled style={{ color: 'rgb(198,14,42)' }} />,
        title: 'Bookmarks',
    },
    {
        icon: <QuestionCircleFilled style={{ color: 'rgb(26,14,198)' }} />,
        title: 'Questions',
    },
    {
        icon: <AccountBookOutlined style={{ color: 'rgb(14,198,174)' }} />,
        title: 'Jobs',
    },
    {
        icon: <CalendarOutlined style={{ color: 'rgb(203,228,23)' }} />,
        title: 'Events',
    },
    {
        icon: <CodepenCircleOutlined style={{ color: 'rgb(228,139,23)' }} />,
        title: 'Courses',
    },
];

export default function LeftBar() {
    const [user, setUser] = useState<IUser[] | null>([]);

    // const user = useAppSelector(getUserCurrentSelector);

    useEffect(() => {
        userApi.getAllUser().then((res: any) => setUser(res));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            {items.map((x, index) => (
                <ButtonItemLeftBar key={index} icon={x.icon} title={x.title} />
            ))}
            <Button size="large" type="text" className={cx('btn-show-more')}>
                Show More
            </Button>
            <div
                style={{
                    paddingLeft: '16px',
                }}
            >
                <Divider
                    style={{
                        borderWidth: '3px',
                        paddingLeft: '16px',
                        margin: '16px 0px 8px',
                    }}
                />
            </div>
            <div>
                {user &&
                    user.map((x, index) => (
                        <AccountItem key={index} user={x} shape={'square'} />
                    ))}
            </div>
        </div>
    );
}

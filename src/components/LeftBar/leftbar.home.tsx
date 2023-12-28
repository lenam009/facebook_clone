'use client';
import styles from './LeftBar.module.scss';
import { ReactNode } from 'react';

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
import AccountItem from '@/components/AccountItem/account.item';

interface IProps {
    title: string;
    icon: ReactNode;
}
const items: IProps[] = [
    {
        title: 'Feed',
        icon: <WifiOutlined />,
    },
    {
        title: 'Chats',
        icon: <WechatOutlined style={{ color: 'rgba(175,20,209,1)' }} />,
    },
    {
        title: 'Videos',
        icon: <VideoCameraFilled style={{ color: 'rgb(58,214,21)' }} />,
    },
    {
        title: 'Groups',
        icon: <UsergroupAddOutlined style={{ color: 'rgb(14,172,198)' }} />,
    },
    {
        title: 'Bookmarks',
        icon: <FileMarkdownFilled style={{ color: 'rgb(198,14,42)' }} />,
    },
    {
        title: 'Questions',
        icon: <QuestionCircleFilled style={{ color: 'rgb(26,14,198)' }} />,
    },
    {
        title: 'Jobs',
        icon: <AccountBookOutlined style={{ color: 'rgb(14,198,174)' }} />,
    },
    {
        title: 'Events',
        icon: <CalendarOutlined style={{ color: 'rgb(203,228,23)' }} />,
    },
    {
        title: 'Courses',
        icon: <CodepenCircleOutlined style={{ color: 'rgb(228,139,23)' }} />,
    },
];

export default function LeftBar({ user }: { user: IUser[] | undefined }) {
    return (
        <div className={styles['wrapper']}>
            {items.map((x, index) => (
                <ButtonItemLeftBar key={index} icon={x.icon} title={x.title} />
            ))}
            <Button size="large" type="text" className={styles['btn-show-more']}>
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

                <h3
                    style={{
                        fontWeight: 650,
                        color: 'rgba(22,24,35,0.65)',
                        marginBottom: '12px',
                    }}
                >
                    Gợi ý kết bạn
                </h3>
            </div>
            <div>
                {user?.map((x, index) => (
                    // @ts-ignore
                    <AccountItem key={index} user={x} shape={'square'} />
                ))}
            </div>
        </div>
    );
}

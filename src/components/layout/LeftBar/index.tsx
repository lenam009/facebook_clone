import classNames from 'classnames/bind';
import styles from './LeftBar.module.scss';

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
import { IProps as IPropAccountItem } from '@/components/AccountItem';

const cx = classNames.bind(styles);

const items: IProps[] = [
    {
        icon: <WifiOutlined />,
        title: 'Feed',
    },
    {
        icon: <WechatOutlined />,
        title: 'Chats',
    },
    {
        icon: <VideoCameraFilled />,
        title: 'Videos',
    },
    {
        icon: <UsergroupAddOutlined />,
        title: 'Groups',
    },
    {
        icon: <FileMarkdownFilled />,
        title: 'Bookmarks',
    },
    {
        icon: <QuestionCircleFilled />,
        title: 'Questions',
    },
    {
        icon: <AccountBookOutlined />,
        title: 'Jobs',
    },
    {
        icon: <CalendarOutlined />,
        title: 'Events',
    },
    {
        icon: <CodepenCircleOutlined />,
        title: 'Courses',
    },
];

const itemsAccountItem: IPropAccountItem[] = [
    {
        avatar: '/assets/person/1.jpeg',
        name: 'Le Nam',
    },
    {
        avatar: '/assets/person/1.jpeg',
        name: 'Le Nam',
    },
    {
        avatar: '/assets/person/122.jpeg',
        name: 'Le Nam',
    },
    {
        avatar: '/assets/person/1.jpeg',
        name: 'Le Nam',
    },
    {
        avatar: '/assets/person/1.jpeg',
        name: 'Le Nam',
    },
    {
        avatar: '/assets/person/122.jpeg',
        name: 'Le Nam',
    },
];

export default function LeftBar() {
    return (
        <div className={cx('wrapper')}>
            {items.map((x, index) => (
                <ButtonItemLeftBar key={index} icon={x.icon} title={x.title} />
            ))}
            <Button size="large" type="text" className={cx('btn-show-more')}>
                Dashed Button
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
                    }}
                />
            </div>
            <div>
                {itemsAccountItem.map((x, index) => (
                    <AccountItem key={index} avatar={x.avatar} name={x.name} />
                ))}
            </div>
        </div>
    );
}

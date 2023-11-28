import classNames from 'classnames/bind';
import styles from './HeaderTabs.module.scss';

import { UserOutlined, MessageOutlined, BellOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { TabsProps, Col, ConfigProvider } from 'antd';

import routes from '@/config/routes';
import ButtonHeaderTab from '@/components/Button/ButtonHeaderTab';

const cx = classNames.bind(styles);

export default function HeaderTabs() {
    const items: TabsProps['items'] = [
        {
            key: routes.home,
            label: <ButtonHeaderTab to={routes.home}>Homepage</ButtonHeaderTab>,
        },
        {
            key: 'timeline',
            label: <ButtonHeaderTab to={routes.profile}>Timeline</ButtonHeaderTab>,
        },
        {
            key: routes.profile,
            label: <ButtonHeaderTab to={routes.profile} icon={<UserOutlined />} badge={2} />,
        },
        {
            key: '4',
            label: <ButtonHeaderTab to={routes.home} icon={<MessageOutlined />} badge={3} />,
        },
        {
            key: '5',
            label: <ButtonHeaderTab to={routes.home} icon={<BellOutlined />} badge={1} />,
        },
    ];

    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            horizontalItemPadding: '0',
                            colorBorderSecondary: 'transparent',
                            inkBarColor: 'blue',
                            horizontalMargin: '0',
                        },
                    },
                }}
            >
                <Tabs centered defaultActiveKey={window.location.pathname} items={items} />
            </ConfigProvider>
        </>
    );
}

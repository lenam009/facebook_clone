import classNames from 'classnames/bind';
import styles from './HeaderTabs.module.scss';
import { useState } from 'react';

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
            key: routes.admin,
            label: <ButtonHeaderTab to={routes.admin}>Timeline</ButtonHeaderTab>,
        },
        {
            key: '3',
            label: <ButtonHeaderTab to={routes.home} icon={<UserOutlined />} />,
        },
        {
            key: '4',
            label: <ButtonHeaderTab to={routes.home} icon={<MessageOutlined />} />,
        },
        {
            key: '5',
            label: <ButtonHeaderTab to={routes.home} icon={<BellOutlined />} />,
        },
    ];

    return (
        <Col span={16} className={cx('wrapper')}>
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
        </Col>
    );
}

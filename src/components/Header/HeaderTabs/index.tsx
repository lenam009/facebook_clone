import { useState, useEffect } from 'react';

import { UserOutlined, MessageOutlined, BellOutlined, HomeOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { TabsProps, ConfigProvider } from 'antd';

import routes from '@/config/routes';
import ButtonHeaderTab from '@/components/Button/ButtonHeaderTab';
import { useAppSelector } from '@/redux/hook';
import { getUserCurrentSelector } from '@/redux/userSlice';

export default function HeaderTabs() {
    const [tab, setTab] = useState(routes.home);

    const user = useAppSelector(getUserCurrentSelector);

    useEffect(() => {
        if (window.location.pathname.includes(routes.profile.prefix)) {
            setTab(routes.profile.prefix);
            return;
        }
        setTab(window.location.pathname);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.location.pathname]);

    const items: TabsProps['items'] = [
        {
            key: routes.home,
            label: <ButtonHeaderTab icon={<HomeOutlined />} to={routes.home} />,
        },

        {
            key: routes.profile.prefix,
            label: (
                <ButtonHeaderTab
                    to={routes.profile.prefix + '/' + 'slug123'}
                    icon={<UserOutlined />}
                />
            ),
        },
    ];

    return (
        <>
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            horizontalItemPadding: '0',
                            horizontalMargin: '0',
                            colorBorderSecondary: 'transparent',
                            // inkBarColor: 'blue',
                        },
                    },
                }}
            >
                {/* defaultActiveKey={window.location.pathname} */}
                <Tabs centered activeKey={tab} items={items} />
            </ConfigProvider>
        </>
    );
}

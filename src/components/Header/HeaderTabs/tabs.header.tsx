import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { UserOutlined, HomeOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { TabsProps, ConfigProvider } from 'antd';
import { convertSlugUrl } from '@/utils/api';

import routes from '@/config/routes/routes';
import ButtonHeaderTab from '@/components/Button/ButtonHeaderTab/button.header.tab';
import { getUserSelector } from '@/utils/redux/userSlice';
import { useAppSelector } from '@/utils/redux/hook';

export default function HeaderTabs() {
    const [tab, setTab] = useState(routes.home.path);
    const pathname = usePathname();

    const currentUser = useAppSelector(getUserSelector);

    useEffect(() => {
        if (pathname.includes(routes.profile.prefix)) {
            console.log('ok');

            setTab(routes.profile.prefix);
            return;
        }
        setTab(pathname);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const items: TabsProps['items'] = [
        {
            key: routes.home.path,
            label: <ButtonHeaderTab icon={<HomeOutlined />} to={routes.home.path} />,
        },
        {
            key: routes.profile.prefix,
            label: (
                <ButtonHeaderTab
                    icon={<UserOutlined />}
                    to={
                        routes.profile.prefix +
                        '/' +
                        convertSlugUrl(currentUser?.username) +
                        '-' +
                        currentUser?._id
                    }
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

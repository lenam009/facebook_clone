import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import {
    UserOutlined,
    MessageOutlined,
    BellOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import { Tabs } from 'antd';
import { TabsProps, ConfigProvider } from 'antd';
import { useSession } from 'next-auth/react';

import routes from '@/config/routes/routes';
import ButtonHeaderTab from '@/components/Button/ButtonHeaderTab/button.header.tab';
// import { useAppSelector } from '@/redux/hook';
// import { getUserCurrentSelector } from '@/redux/userSlice';

export default function HeaderTabs() {
    const [tab, setTab] = useState(routes.home.path);
    const pathname = usePathname();
    const { data: session } = useSession();

    // const user = useAppSelector(getUserCurrentSelector);

    // console.log('pathname', pathname);
    // console.log('tab', tab);
    // console.log('routes.profile.prefix', routes.profile.prefix);

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
                    to={routes.profile.prefix + '/' + session?.user.username}
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

import classNames from 'classnames/bind';
import styles from './RightBar.module.scss';
import { useEffect, useState } from 'react';

import { Divider } from 'antd';

import ButtonRightBarAd from '@/components/Button/ButtonRightBarAd';
import AccountItem from '@/components/AccountItem';
import { Users } from '@/data/dataFacebook';
import { IUser } from '@/api/userApi';
import userApi from '@/api/userApi';

const cx = classNames.bind(styles);

export default function RightBar() {
    const [user, setUser] = useState<IUser[] | null>([]);

    // const user = useAppSelector(getUserCurrentSelector);

    useEffect(() => {
        userApi.getAllUser().then((res: any) => setUser(res));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h3 style={{ fontWeight: 650, color: 'rgba(22,24,35,0.65)' }}>Được tài trợ</h3>
            <ButtonRightBarAd
                image="/assets/ad.png"
                title="NHANH TAY ANH EM ƠI"
                desc="shopcafe.qq52.info"
            />
            <ButtonRightBarAd
                image="/assets/person/8.jpeg"
                title="Mịn da trắng sáng"
                desc="mypham.shopvg.vn"
            />

            <Divider style={{ margin: '12px 0px', backgroundColor: 'rgba(22,24,35,0.18)' }} />
            <h3
                style={{ fontWeight: 650, color: 'rgba(22,24,35,0.65)', marginBottom: '12px' }}
            >
                Những người bạn đang online
            </h3>
            <div style={{ marginLeft: '-16px' }}>
                {user &&
                    user.map((x, index) => (
                        <AccountItem user={x} size={'large'} online={true} />
                    ))}
            </div>
        </div>
    );
}

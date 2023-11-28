import classNames from 'classnames/bind';
import styles from './RightBar.module.scss';

import { Divider } from 'antd';

import ButtonRightBarAd from '@/components/Button/ButtonRightBarAd';
import AccountItem from '@/components/AccountItem';
import { IProps as IPropAccountItem } from '@/components/AccountItem';
import { Users } from '@/data/dataFacebook';

const cx = classNames.bind(styles);

export default function RightBar() {
    return (
        <div className={cx('wrapper')}>
            <h3 style={{ fontWeight: 650, color: 'rgba(22,24,35,0.65)' }}>Được tài trợ</h3>
            <ButtonRightBarAd
                image="/assets/ad.png"
                title="NHANH TAY ANH EM ƠI"
                desc="shopcafe.qq52.info"
            />
            <ButtonRightBarAd
                image="/assets/person/10.jpeg"
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
                {Users.map((x, index) => (
                    <AccountItem
                        key={index}
                        avatar={x.profilePicture}
                        name={x.username}
                        size={'large'}
                        online={true}
                    />
                ))}
            </div>
        </div>
    );
}

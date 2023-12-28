'use client';
import styles from './RightBar.module.scss';
import { useEffect, useState } from 'react';

import { Divider } from 'antd';

import ButtonRightBarAd from '@/components/Button/ButtonRightBarAd';
import AccountItem from '@/components/AccountItem/account.item';

export default function RightBar({ user }: { user: IUser[] | undefined }) {
    return (
        <div className={styles['wrapper']}>
            <h3 style={{ fontWeight: 650, color: 'rgba(22,24,35,0.65)' }}>
                Được tài trợ
            </h3>
            <ButtonRightBarAd
                image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/ad.png`}
                title="NHANH TAY ANH EM ƠI"
                desc="shopcafe.qq52.info"
            />
            <ButtonRightBarAd
                image={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/heart.png`}
                title="Mịn da trắng sáng"
                desc="mypham.shopvg.vn"
            />
            <Divider
                style={{ margin: '12px 0px', backgroundColor: 'rgba(22,24,35,0.18)' }}
            />
            <h3
                style={{
                    fontWeight: 650,
                    color: 'rgba(22,24,35,0.65)',
                    marginBottom: '12px',
                    paddingLeft: '6px',
                }}
            >
                Bạn đang theo dõi:
            </h3>
            <div>
                {user &&
                    user.map((x, index) => (
                        <AccountItem
                            user={x}
                            key={x._id + ''}
                            size={'large'}
                            online={true}
                        />
                    ))}
            </div>
        </div>
    );
}

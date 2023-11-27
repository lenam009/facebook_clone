import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useState } from 'react';

import { FacebookFilled, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Row, Col, Flex } from 'antd';

import HeaderTabs from './HeaderTabs';
import Search from './Search';

const cx = classNames.bind(styles);

export default function Header() {
    const [showInputSearch, setShowInputSearch] = useState(false);

    return (
        <header className={cx('header-container')}>
            <Row style={{ padding: '0px 20px' }}>
                <Col span={4} className={cx('header-left')}>
                    <Flex gap={20} align="center" style={{ height: '100%' }}>
                        <FacebookFilled className={cx('icon-facebook')} />
                        <SearchOutlined
                            className={cx('icon-search')}
                            onClick={() => setShowInputSearch(true)}
                        />
                    </Flex>
                </Col>
                <HeaderTabs />
                <Col span={4} className={cx('header-right')}>
                    <Flex justify="end" align="center" style={{ height: '100%' }}>
                        <Avatar
                            size="large"
                            className={cx('avatar')}
                            icon={<UserOutlined />}
                        />
                    </Flex>
                </Col>
            </Row>

            <Search
                showInputSearch={showInputSearch}
                setShowInputSearch={setShowInputSearch}
            />
        </header>
    );
}

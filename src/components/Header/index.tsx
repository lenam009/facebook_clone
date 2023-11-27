import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FacebookFilled, SearchOutlined } from '@ant-design/icons';
import { Avatar, Row, Col, Flex } from 'antd';

import HeaderTabs from './HeaderTabs';
import Search from './Search';
import routes from '@/config/routes';

const cx = classNames.bind(styles);

export default function Header() {
    const [showInputSearch, setShowInputSearch] = useState<boolean>(false);

    return (
        <header className={cx('header-container')}>
            <Row style={{ padding: '0px 20px', width: '100%' }}>
                <Col span={4} className={cx('header-left')}>
                    <Flex gap={20} align="center" style={{ height: '100%' }}>
                        <Link to={routes.home}>
                            <Avatar style={{ backgroundColor: 'blue' }}>
                                <FacebookFilled className={cx('icon-facebook')} />
                            </Avatar>
                        </Link>
                        <SearchOutlined
                            className={cx('icon-search')}
                            onClick={() => setShowInputSearch(true)}
                        />
                    </Flex>
                </Col>
                <Col span={16} className={cx('wrapper')}>
                    <HeaderTabs />
                </Col>
                <Col span={4} className={cx('header-right')}>
                    <Flex justify="end" align="center" style={{ height: '100%' }}>
                        <Avatar
                            size="large"
                            className={cx('avatar')}
                            src={'/assets/person/1.jpeg'}
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

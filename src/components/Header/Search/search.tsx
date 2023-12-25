import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useRef } from 'react';

import { Flex, Input, InputRef, ConfigProvider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
const { Search: SearchAntd } = Input;

const cx = classNames.bind(styles);

interface IProps {
    showInputSearch: boolean;
    setShowInputSearch: (value: boolean) => void;
}
export default function Search({ showInputSearch, setShowInputSearch }: IProps) {
    const inputRef = useRef<InputRef | null>(null);

    return (
        <>
            {showInputSearch && (
                <div className={cx('wrapper')}>
                    <div></div>
                    <div className={cx('wrapper-search')}>
                        <Flex gap={10} justify="space-between">
                            <ArrowLeftOutlined
                                className={cx('btn-back')}
                                onClick={() => setShowInputSearch(false)}
                            />
                            {/* <Input
                                size="large"
                                autoFocus
                                ref={inputRef}
                                style={{ borderRadius: '99px' }}
                                placeholder="Tìm kiếm trên Facebook"
                                 className={cx('input')}
                            /> */}

                            <ConfigProvider
                                theme={{
                                    components: {
                                        Input: {
                                            colorPrimaryHover: '#d9d9d9',
                                        },
                                    },
                                }}
                            >
                                <SearchAntd
                                    size="large"
                                    autoFocus
                                    ref={inputRef}
                                    placeholder="Tìm kiếm trên Facebook"
                                    className={cx('input')}
                                    bordered={false}
                                />
                            </ConfigProvider>
                        </Flex>
                    </div>
                </div>
            )}
        </>
    );
}

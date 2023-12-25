import styles from './Share.module.scss';
import React, { ReactNode, useState } from 'react';
// import { useAppSelector } from '@/redux/hook';
// import { getUserCurrentSelector } from '@/redux/userSlice';

import { Avatar, Flex, Input, Button, message } from 'antd';
import type { UploadProps } from 'antd';
import {
    UserOutlined,
    SnippetsOutlined,
    TagOutlined,
    EnvironmentOutlined,
    SmileOutlined,
} from '@ant-design/icons';
// import postApi from '@/api/postApi';
// import axios from 'axios';

const items: {
    key?: string;
    title: string;
    icon: ReactNode;
}[] = [
    {
        title: 'Tag',
        icon: <TagOutlined style={{ color: 'blue' }} />,
    },
    {
        title: 'Location',
        icon: <EnvironmentOutlined style={{ color: 'green' }} />,
    },
    {
        title: 'Feeling',
        icon: <SmileOutlined style={{ color: 'orange' }} />,
    },
];

interface IProp {
    user: IUser | null;
}

export default function Share({ user }: IProp) {
    // const userCurrent = useAppSelector(getUserCurrentSelector);
    const [messageApi, contextHolder] = message.useMessage();
    const [desc, setDesc] = useState<string>('');
    const [file, setFile] = useState<any>(null);

    const handleOnChangeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
    };

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Đăng bài viết thành công',
            duration: 1,
        });
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Đăng bài viết thất bại!',
        });
    };

    const handleOnClickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // const fetchPost = async () => {
        //     if (user && user._id) {
        //         const filename: string = Date.now().toString() + file.name;
        //         if (file) {
        //             const data = new FormData();

        //             data.append('file', file);
        //             // data.append('name', filename);

        //             await axios
        //                 .post('http://localhost:8088/api/upload', data)
        //                 .catch((e) => {});
        //         }

        //         postApi
        //             .create(user?._id, desc, file.name)
        //             .then(() => {
        //                 setDesc('');
        //                 success();
        //             })
        //             .catch(() => error());
        //     } else {
        //         error();
        //     }
        // };

        // fetchPost();
    };

    return (
        <div className={styles['wrapper']}>
            {contextHolder}
            <form onSubmit={handleOnClickSubmit}>
                <div className={styles['wrapper-input']}>
                    <Flex>
                        <Avatar
                            icon={<UserOutlined />}
                            size={'large'}
                            src={
                                process.env.NEXT_PUBLIC_BACKEND_URL +
                                '/images/person/' +
                                '1.jpeg'
                            }
                        />
                        <Input
                            style={{ fontSize: '1.8rem' }}
                            placeholder={
                                user?.username + ' ơi, ' + 'bạn đang nghĩ gì thế?'
                            }
                            bordered={false}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </Flex>
                </div>
                <div
                    style={{
                        padding: '0px 12px',
                        marginTop: '20px',
                    }}
                >
                    <hr style={{ borderColor: 'rgba(22,24,35,0.05)' }} />
                </div>
                <div className={styles['list-button']}>
                    <Flex
                        justify="space-between"
                        align="center"
                        style={{ padding: '0 12px' }}
                    >
                        <Button
                            style={{ padding: '0px 0px' }}
                            size="large"
                            className={styles['button']}
                            type="text"
                            onClick={() => {
                                console.log('upload');
                            }}
                            htmlType="button"
                        >
                            <label
                                htmlFor="file"
                                style={{ cursor: 'pointer', padding: '0px 8px' }}
                            >
                                <input
                                    style={{ display: 'none', width: '100%' }}
                                    type="file"
                                    id="file"
                                    name="file"
                                    accept=".png,.jpeg,.jpg"
                                    onChange={handleOnChangeUpload}
                                />
                                <SnippetsOutlined
                                    style={{ color: 'red', marginRight: '8px' }}
                                />
                                Photo or Video
                            </label>
                        </Button>

                        {items.map((x, index) => (
                            <Button
                                style={{ padding: '0px 12px' }}
                                size="large"
                                className={styles['button']}
                                type="text"
                                icon={x.icon}
                                key={index}
                            >
                                {x.title}
                            </Button>
                        ))}
                        <Button htmlType="submit" type="primary">
                            Share
                        </Button>
                    </Flex>
                </div>
            </form>
        </div>
    );
}

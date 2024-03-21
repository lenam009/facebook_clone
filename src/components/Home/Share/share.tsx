import styles from './Share.module.scss';
import React, { ReactNode, useState, useRef } from 'react';
// import { useAppSelector } from '@/redux/hook';
// import { getUserCurrentSelector } from '@/redux/userSlice';

import { Avatar, Flex, Input, Button, message, Upload } from 'antd';
import type { UploadProps } from 'antd';
import {
    UserOutlined,
    SnippetsOutlined,
    TagOutlined,
    EnvironmentOutlined,
    SmileOutlined,
} from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { handleCreatePost, revalidateGetPostsFollowing } from '@/utils/actions/actions';
import { UploadFile } from 'antd';
import AvatarCustom from '@/components/Avatar/avatar.custom';

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

const getTypeOfFile = (fileName: string): { type: string; target_type: string } => {
    if (fileName.startsWith('video'))
        return {
            type: 'video',
            target_type: 'video',
        };
    if (fileName.startsWith('image'))
        return {
            type: 'img',
            target_type: 'image_post',
        };
    return { type: '', target_type: '' };
};

interface IProp {
    user: IUser | undefined;
}

export default function Share({ user }: IProp) {
    const [desc, setDesc] = useState<string>('');
    const [file, setFile] = useState<string>('');
    const [fieldList, setFieldList] = useState<UploadFile[]>([]);

    const { data: sessionAuth } = useSession();

    const props: UploadProps = {
        name: 'file',
        action: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`,
        headers: {
            Authorization: `Bearer ${sessionAuth?.access_token}`,
        },
        maxCount: 1,

        defaultFileList: fieldList,

        beforeUpload: (file) => {
            const isImageOrVideo = [
                'image/png',
                'image/jpg',
                'image/jpeg',
                'video/x-flv',
                'video/mp4',
                'application/x-mpegURL',
                'video/x-matroska',
                'video/MP2T',
                'video/3gpp',
                'video/quicktime',
                'video/x-msvideo',
                'video/x-ms-wmv',
            ].includes(file.type);
            if (!isImageOrVideo) {
                message.error(`${file.name} isn't image or video`);
            }
            return isImageOrVideo || Upload.LIST_IGNORE;
        },

        onChange(info) {
            if (info.fileList[0]?.response) {
                setFile(info.fileList[0].response.data.filename);
                setFieldList(info.fileList);
                console.log('info.fileList[0]: ', info.fileList[0]);
            }
            if (info.file.status === 'done') {
                setFieldList(info.fileList);
            } else if (info.file.status === 'error') {
                message.error(info.fileList[0].response.message);
            }
        },
    };

    const handleOnClickSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const typeOfFile = getTypeOfFile(file);

        const createPost = await handleCreatePost({
            desc,
            target_type: typeOfFile.target_type,
            [typeOfFile.type]: file,
        });

        if (createPost.data) {
            revalidateGetPostsFollowing();
            setFieldList([]);
            setFile('');
            setDesc('');
            message.success(createPost.message);
        } else {
            message.error(createPost.message);
        }
    };

    return (
        <div className={styles['wrapper']}>
            <form onSubmit={handleOnClickSubmit}>
                <div className={styles['wrapper-input']}>
                    <Flex>
                        <AvatarCustom user={user} />
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
                        <Upload {...props} style={{ backgroundColor: 'red' }}>
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
                                    <SnippetsOutlined
                                        style={{ color: 'red', marginRight: '8px' }}
                                    />
                                    Photo or Video
                                </label>
                            </Button>
                        </Upload>

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

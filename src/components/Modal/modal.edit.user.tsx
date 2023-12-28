'use client';
import { useCallback, useRef, useEffect, MouseEventHandler, useState } from 'react';
import Box from '@mui/material/Box';
import { useHasMounted } from '@/utils/customHook';

import { Button, Modal as ModalAntd, Form, Input, Image, Upload, message } from 'antd';
import type { UploadProps } from 'antd';
import { useAppSelector } from '@/utils/redux/hook';
import { getUserSelector } from '@/utils/redux/userSlice';
import { UploadOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import { handleUpdateUser, revalidateGetOneUseById } from '@/utils/actions/actions';
import { useRouter } from 'next/navigation';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type FieldType = {
    username: string;
    password: string;
    email: string;
    desc: string;
    city: string;
    from: string;
    profilePicture: string;
    coverPicture: string;
};

export default function Modal() {
    const overlay = useRef(null);
    const wrapper = useRef(null);
    const [form] = Form.useForm();
    const hasMounted = useHasMounted();
    const { data: sessionAuth } = useSession();
    const router = useRouter();

    const [profilePicture, setProfilePicture] = useState('');
    const [coverPicture, setCoverPicture] = useState('');

    const userCurrent = useAppSelector(getUserSelector);

    const props: UploadProps = {
        name: 'file',
        action: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`,
        headers: {
            Authorization: `Bearer ${sessionAuth?.access_token}`,
        },
        maxCount: 1,

        // fileList: fieldList,

        beforeUpload: (file) => {
            const isPNG = [
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
            if (!isPNG) {
                message.error(`${file.name} isn't image or video`);
            }
            return isPNG || Upload.LIST_IGNORE;
        },
    };

    const propsProfilePicture: UploadProps = {
        ...props,
        onChange(info) {
            if (info.fileList[0]?.response) {
                setProfilePicture(info.fileList[0].response.data.filename);
            }
            if (info.file.status === 'done') {
                // message.success(info.fileList[0].response.message);
            } else if (info.file.status === 'error') {
                // message.error(info.fileList[0].response.message);
            }
        },
    };

    const propsCoverPicture: UploadProps = {
        ...props,
        onChange(info) {
            if (info.fileList[0]?.response) {
                setCoverPicture(info.fileList[0].response.data.filename);
            }
            if (info.file.status === 'done') {
                // message.success(info.fileList[0].response.message);
            } else if (info.file.status === 'error') {
                // message.error(info.fileList[0].response.message);
            }
        },
    };

    const onDismiss = useCallback(() => {
        router.back();
    }, [router]);

    const onClick: MouseEventHandler = useCallback(
        (e) => {
            if (e.target === overlay.current || e.target === wrapper.current) {
                if (onDismiss) onDismiss();
            }
        },
        [onDismiss, overlay, wrapper],
    );

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onDismiss();
        },
        [onDismiss],
    );

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onKeyDown]);

    useEffect(() => {
        if (userCurrent) {
            form.setFieldsValue({
                username: userCurrent.username,
                email: userCurrent.email,
                desc: userCurrent.desc,
                city: userCurrent.city,
                from: userCurrent.from,
            });
        }
    }, []);

    const onFinish = async (values: FieldType) => {
        const data: FieldType = { ...values, profilePicture, coverPicture };
        const result = await handleUpdateUser(data);

        if (result.data) {
            onDismiss();
            revalidateGetOneUseById();
            message.success(result.message);
        } else {
            message.error(result.message);
        }

        console.log('data', data);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    if (!hasMounted) return <></>;

    return (
        <>
            <div
                ref={overlay}
                style={{
                    position: 'fixed',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    opacity: '0.6',
                    backgroundColor: 'black',
                }}
                onClick={onClick}
            ></div>

            <ModalAntd
                title="Edit user"
                open={true}
                onOk={() => form.submit()}
                onCancel={() => onDismiss()}
            >
                <Form
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 19 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item<FieldType> label="Email" name="email">
                        <Input disabled />
                    </Form.Item>

                    <Form.Item<FieldType> label="Tên" name="username">
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType> label="Mô tả" name="desc">
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType> label="Quê quán" name="from">
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType> label="Nơi ở hiện tại" name="city">
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType> label="Ảnh cá nhân">
                        <Box
                            sx={{
                                display: 'flex',
                                alignContent: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Upload {...propsProfilePicture}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>

                            {profilePicture && (
                                <Box>
                                    New:&nbsp;
                                    <Image
                                        height={40}
                                        width={40}
                                        fallback="/unknown.png"
                                        style={{ borderRadius: '8px' }}
                                        src={
                                            process.env.NEXT_PUBLIC_BACKEND_URL +
                                            '/test/' +
                                            profilePicture
                                        }
                                    />
                                </Box>
                            )}

                            <Box>
                                Current:&nbsp;
                                <Image
                                    height={40}
                                    width={40}
                                    fallback="/unknown.png"
                                    style={{ borderRadius: '8px' }}
                                    src={
                                        process.env.NEXT_PUBLIC_BACKEND_URL +
                                        '/images/person/' +
                                        userCurrent?.profilePicture
                                    }
                                />
                            </Box>
                        </Box>
                    </Form.Item>

                    <Form.Item<FieldType> label="Ảnh bìa">
                        <Box
                            sx={{
                                display: 'flex',
                                alignContent: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Upload {...propsCoverPicture}>
                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                            </Upload>

                            {coverPicture && (
                                <Box>
                                    New:&nbsp;
                                    <Image
                                        height={40}
                                        width={40}
                                        fallback="/unknown.png"
                                        style={{ borderRadius: '8px' }}
                                        src={
                                            process.env.NEXT_PUBLIC_BACKEND_URL +
                                            '/test/' +
                                            coverPicture
                                        }
                                    />
                                </Box>
                            )}
                            <Box>
                                Current:&nbsp;
                                <Image
                                    height={40}
                                    width={40}
                                    fallback="/unknown.png"
                                    style={{ borderRadius: '8px' }}
                                    src={
                                        process.env.NEXT_PUBLIC_BACKEND_URL +
                                        '/images/person/' +
                                        userCurrent?.coverPicture
                                    }
                                />
                            </Box>
                        </Box>
                    </Form.Item>
                </Form>
            </ModalAntd>
        </>
    );
}

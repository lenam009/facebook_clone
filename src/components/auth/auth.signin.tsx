'use client';
import styles from './auth.signin.module.scss';

import Link from 'next/link';
import { useState, useEffect } from 'react';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import * as Yup from 'yup';

import { Row, Col, Flex, Form, Input, Button, Divider, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { signIn, useSession } from 'next-auth/react';
import { handleGetOneUseById, revalidateGetOneUseById } from '@/utils/actions/actions';
import { useAppDispatch, useAppSelector } from '@/utils/redux/hook';
import { setUser, getUserSelector } from '@/utils/redux/userSlice';
import { sendRequest } from '@/utils/api';

import routes from '@/config/routes/routes';

export default function AuthSignin() {
    const { data: session } = useSession();

    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleOnSubmit = async (values: any) => {
        setIsLoading(true);
        const result = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
        });
        setIsLoading(false);

        if (result?.ok) {
            revalidateGetOneUseById();
            router.push(routes.home.path);
        } else {
            message.error(result?.error);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Email không được bỏ trống *')
                .matches(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    'Vui lòng nhập đúng định dạng Email',
                ),
            password: Yup.string().required('Mật khẩu không được bỏ trống *'),
        }),
        onSubmit: handleOnSubmit,
    });

    return (
        <Row className={styles['wrapper']}>
            <Col span={5}></Col>
            <Col className={styles['col-facebook']} span={6}>
                <Flex justify="center" vertical rootClassName={styles['flex']}>
                    <h1 className={styles['facebook']}>facebook</h1>
                    <span className={styles['desc']}>
                        Kết nối bạn bè và mọi người trên thế giới với facebook
                    </span>
                </Flex>
            </Col>
            <Col span={2}></Col>
            <Col className={styles['col-form']} span={6}>
                <Flex justify="center" vertical rootClassName={styles['flex']}>
                    <div className={styles['form']}>
                        <form onSubmit={formik.handleSubmit}>
                            <Form.Item style={{ margin: '16px 0px' }}>
                                <Input
                                    autoFocus
                                    value={formik.values.email}
                                    className={styles['input']}
                                    placeholder="Email"
                                    name="email"
                                    onChange={formik.handleChange}
                                />
                                <span className={styles['errorMessage']}>
                                    {formik.errors.email}&nbsp;
                                </span>
                            </Form.Item>
                            <Form.Item style={{ margin: '16px 0px' }}>
                                <Input.Password
                                    className={styles['input']}
                                    placeholder="Mật khẩu"
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                <span className={styles['errorMessage']}>
                                    {formik.errors.password}&nbsp;
                                </span>
                            </Form.Item>
                            <Form.Item style={{ margin: 0 }}>
                                <Button
                                    size="large"
                                    className={styles['btn-login']}
                                    // disabled={isFetching}
                                    type="primary"
                                    block
                                    htmlType="submit"
                                >
                                    {isLoading ? (
                                        <Spin
                                            style={{ color: 'blue' }}
                                            indicator={
                                                <LoadingOutlined
                                                    style={{ fontSize: 24 }}
                                                    spin
                                                />
                                            }
                                        />
                                    ) : (
                                        ' Đăng nhập'
                                    )}
                                </Button>
                            </Form.Item>
                        </form>

                        <span className={styles['forget-password']}>Quên mật khẩu?</span>

                        <Divider
                            style={{
                                margin: '16px 0px',
                                backgroundColor: 'rgba(22,24,35,0.18)',
                            }}
                        />
                        <Flex justify="center">
                            <Button
                                type="primary"
                                size="large"
                                className={styles['register']}
                            >
                                <Link href={routes.register.path}>Tạo tài khoản mới</Link>
                            </Button>
                        </Flex>
                    </div>
                </Flex>
            </Col>
            <Col span={5}></Col>
        </Row>
    );
}

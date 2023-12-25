'use client';
import styles from './auth.signin.module.scss';

import Link from 'next/link';
import { useState } from 'react';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';

import * as Yup from 'yup';

import { Row, Col, Flex, Form, Input, Button, Divider, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { signIn } from 'next-auth/react';

import routes from '@/config/routes/routes';
// import { useAppDispatch, useAppSelector } from '@/redux/hook';
// import {
//     setUser,
//     setIsFetching,
//     getIsFetching,
//     loginStart,
//     loginSuccess,
//     loginFailed,
// } from '@/redux/userSlice';
// import authApi from '@/api/authApi';

export default function AuthSignin() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    // const dispatch = useAppDispatch();

    // const isFetching = useAppSelector(getIsFetching);

    // const navigate = useNavigate();

    const handleOnSubmit = async (values: any) => {
        console.log(values);

        setIsLoading(true);
        const result = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
        });
        setIsLoading(false);

        if (result?.ok) {
            console.log('ok');

            router.push(routes.home.path);
        } else {
            message.error(result?.error);
        }

        console.log(result);

        // dispatch(loginStart());
        // const fetchLogin = async () => {
        //     const data = await authApi.login(values.email, values.password);
        //     if (data && data.user) {
        //         dispatch(loginSuccess(data.user));
        //         localStorage.setItem('refresh_token', data.user.refresh_token!);
        //         // Cookie.
        //         navigate(routes.users);
        //     } else {
        //         dispatch(loginFailed());
        //         message.error('Sai email hoặc mật khẩu !!!');
        //     }
        // };
        // fetchLogin();
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

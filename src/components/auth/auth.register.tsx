'use client';
import styles from './auth.register.module.scss';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

import { Row, Col, Flex, Form, Input, Button, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { handleRegister } from '@/utils/actions/actions';

import routes from '@/config/routes/routes';

export default function AuthRegister() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleOnSubmit = async (
        values: { email: string; username: string; password: string },
        { resetForm }: any,
    ) => {
        setIsLoading(true);
        const result = await handleRegister({
            email: values.email,
            username: values.username,
            password: values.password,
        });
        setIsLoading(false);

        if (result.data) {
            resetForm();
            message.success(result.message);
        } else {
            message.error(result.message);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Email không được bỏ trống *')
                .matches(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    'Vui lòng nhập đúng định dạng Email',
                ),
            username: Yup.string().required('Tên không được bỏ trống *'),
            password: Yup.string().required('Mật khẩu không được bỏ trống *'),
            confirmPassword: Yup.string()
                .required('Xác nhận mật khẩu không được bỏ trống *')
                .oneOf([Yup.ref('password')], 'Mật khẩu không trùng khớp'),
        }),
        onSubmit: handleOnSubmit,
    });

    return (
        <Row className={styles['wrapper']}>
            <Col span={5}></Col>
            <Col className={styles['col-facebook']} span={6}>
                <Flex justify="center" vertical rootClassName={styles['flex']}>
                    <h1 className={styles['facebook']}>facebook</h1>
                    <p className={styles['desc']}>
                        Kết nối bạn bè và mọi người trên thế giới với facebook
                    </p>
                </Flex>
            </Col>
            <Col span={2}></Col>
            <Col className={styles['col-form']} span={6}>
                <Flex justify="center" vertical rootClassName={styles['flex']}>
                    <div className={styles['form']}>
                        <form onSubmit={formik.handleSubmit}>
                            <Form.Item style={{ margin: '16px 0px' }}>
                                <Input
                                    name="email"
                                    className={styles['input']}
                                    placeholder="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                                <span className={styles['errorMessage']}>
                                    {formik.errors.email}&nbsp;
                                </span>
                            </Form.Item>
                            <Form.Item style={{ margin: '16px 0px' }}>
                                <Input
                                    name="username"
                                    className={styles['input']}
                                    placeholder="Tên người dùng"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                />
                                <span className={styles['errorMessage']}>
                                    {formik.errors.username}&nbsp;
                                </span>
                            </Form.Item>
                            <Form.Item style={{ margin: '16px 0px' }}>
                                <Input.Password
                                    name="password"
                                    className={styles['input']}
                                    placeholder="Mật khẩu"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                                <span className={styles['errorMessage']}>
                                    {formik.errors.password}&nbsp;
                                </span>
                            </Form.Item>
                            <Form.Item style={{ margin: '16px 0px' }}>
                                <Input.Password
                                    name="confirmPassword"
                                    className={styles['input']}
                                    placeholder="Nhập lại mật khẩu"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                />
                                <span className={styles['errorMessage']}>
                                    {formik.errors.confirmPassword}&nbsp;
                                </span>
                            </Form.Item>
                            <Form.Item style={{ margin: '16px 0px' }}>
                                <Button
                                    size="large"
                                    className={styles['btn-login']}
                                    disabled={isLoading}
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
                                        ' Đăng ký'
                                    )}
                                </Button>
                            </Form.Item>
                        </form>

                        <Flex style={{ marginTop: '16px' }} justify="center">
                            <Button
                                type="primary"
                                size="large"
                                className={styles['login']}
                            >
                                <Link href={routes.login.path}>Đăng nhập</Link>
                            </Button>
                        </Flex>
                    </div>
                </Flex>
            </Col>
            <Col span={5}></Col>
        </Row>
    );
}

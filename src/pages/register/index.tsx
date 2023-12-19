import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Row, Col, Flex, Form, Input, Button, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import routes from '@/config/routes';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
    setUser,
    setIsFetching,
    getIsFetching,
    registerStart,
    registerSuccess,
    registerFailed,
} from '@/redux/userSlice';
import authApi from '@/api/authApi';

const cx = classNames.bind(styles);

export default function Register() {
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useAppDispatch();

    const isFetching = useAppSelector(getIsFetching);

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'This is an error message',
        });
    };

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'This is a success message',
        });
    };
    const handleOnSubmit = (values: any, { resetForm }: any) => {
        dispatch(registerStart());
        const fetchLogin = async () => {
            const data = await authApi.register(
                values.email,
                values.password,
                values.username,
            );
            if (data && data.user) {
                dispatch(registerSuccess());
                resetForm();
                success();
            } else {
                dispatch(registerFailed());
                error();
            }
        };
        fetchLogin();
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
        <Row className={cx('wrapper')}>
            {contextHolder}
            <Col span={5}></Col>
            <Col className={cx('col-facebook')} span={6}>
                <Flex justify="center" vertical rootClassName={cx('flex')}>
                    <h1 className={cx('facebook')}>facebook</h1>
                    <p className={cx('desc')}>
                        Kết nối bạn bè và mọi người trên thế giới với facebook
                    </p>
                </Flex>
            </Col>
            <Col span={2}></Col>
            <Col className={cx('col-form')} span={6}>
                <Flex justify="center" vertical rootClassName={cx('flex')}>
                    <div className={cx('form')}>
                        <form onSubmit={formik.handleSubmit}>
                            <Form.Item style={{ margin: '16px 0px' }}>
                                <Input
                                    name="email"
                                    className={cx('input')}
                                    placeholder="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                                <span className={cx('errorMessage')}>
                                    {formik.errors.email}&nbsp;
                                </span>
                            </Form.Item>
                            <Form.Item style={{ margin: '16px 0px' }}>
                                <Input
                                    name="username"
                                    className={cx('input')}
                                    placeholder="Tên người dùng"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                />
                                <span className={cx('errorMessage')}>
                                    {formik.errors.username}&nbsp;
                                </span>
                            </Form.Item>
                            <Form.Item style={{ margin: '16px 0px' }}>
                                <Input.Password
                                    name="password"
                                    className={cx('input')}
                                    placeholder="Mật khẩu"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                                <span className={cx('errorMessage')}>
                                    {formik.errors.password}&nbsp;
                                </span>
                            </Form.Item>
                            <Form.Item style={{ margin: '16px 0px' }}>
                                <Input.Password
                                    name="confirmPassword"
                                    className={cx('input')}
                                    placeholder="Nhập lại mật khẩu"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                />
                                <span className={cx('errorMessage')}>
                                    {formik.errors.confirmPassword}&nbsp;
                                </span>
                            </Form.Item>
                            <Form.Item style={{ margin: '16px 0px' }}>
                                <Button
                                    size="large"
                                    className={cx('btn-login')}
                                    type="primary"
                                    block
                                    htmlType="submit"
                                >
                                    {isFetching ? (
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
                            <Button type="primary" size="large" className={cx('login')}>
                                <Link to={routes.login}>Đăng nhập</Link>
                            </Button>
                        </Flex>
                    </div>
                </Flex>
            </Col>
            <Col span={5}></Col>
        </Row>
    );
}

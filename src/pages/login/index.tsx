import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Row, Col, Flex, Form, Input, Button, Divider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import routes from '@/config/routes';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
    setUser,
    setIsFetching,
    getIsFetching,
    setErrorLogin,
    getErrorLogin,
} from '@/redux/userSlice';
import authApi from '@/api/authApi';

const cx = classNames.bind(styles);

export default function Login() {
    const dispatch = useAppDispatch();

    const isFetching = useAppSelector(getIsFetching);
    const errorLogin = useAppSelector(getErrorLogin);

    const navigate = useNavigate();

    const handleOnSubmit = (values: any) => {
        dispatch(setIsFetching(true));

        const fetchLogin = async () => {
            const data = await authApi.login(values.email, values.password);
            dispatch(setIsFetching(false));
            if (data && data.user) {
                dispatch(setUser(data.user));
                dispatch(setErrorLogin(false));
                navigate(routes.home);
            } else {
                dispatch(setErrorLogin(true));
            }
        };

        fetchLogin();
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
        <Row className={cx('wrapper')}>
            <Col span={5}></Col>
            <Col className={cx('col-facebook')} span={6}>
                <Flex justify="center" vertical rootClassName={cx('flex')}>
                    <h1 className={cx('facebook')}>facebook</h1>
                    <span className={cx('desc')}>
                        Kết nối bạn bè và mọi người trên thế giới với facebook
                    </span>
                </Flex>
            </Col>
            <Col span={2}></Col>
            <Col className={cx('col-form')} span={6}>
                <Flex justify="center" vertical rootClassName={cx('flex')}>
                    <div className={cx('form')}>
                        <form onSubmit={formik.handleSubmit}>
                            <Form.Item style={{ margin: '16px 0px' }}>
                                <Input
                                    autoFocus
                                    value={formik.values.email}
                                    className={cx('input')}
                                    placeholder="Email"
                                    name="email"
                                    onChange={formik.handleChange}
                                />
                                <span className={cx('errorMessage')}>
                                    {formik.errors.email}&nbsp;
                                </span>
                            </Form.Item>
                            <Form.Item style={{ margin: '16px 0px' }}>
                                <Input.Password
                                    className={cx('input')}
                                    placeholder="Mật khẩu"
                                    name="password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                <span className={cx('errorMessage')}>
                                    {formik.errors.password}&nbsp;
                                </span>
                            </Form.Item>
                            <Form.Item style={{ margin: 0 }}>
                                <Button
                                    size="large"
                                    className={cx('btn-login')}
                                    disabled={isFetching}
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
                                        ' Đăng nhập'
                                    )}
                                </Button>
                                {errorLogin && (
                                    <h5
                                        style={{ marginTop: '4px', textAlign: 'right' }}
                                        className={cx('errorMessage')}
                                    >
                                        Sai email hoặc mật khẩu !!!
                                    </h5>
                                )}
                            </Form.Item>
                        </form>

                        <span className={cx('forget-password')}>Quên mật khẩu?</span>

                        <Divider
                            style={{
                                margin: '16px 0px',
                                backgroundColor: 'rgba(22,24,35,0.18)',
                            }}
                        />
                        <Flex justify="center">
                            <Button type="primary" size="large" className={cx('register')}>
                                <Link to={routes.register}>Tạo tài khoản mới</Link>
                            </Button>
                        </Flex>
                    </div>
                </Flex>
            </Col>
            <Col span={5}></Col>
        </Row>
    );
}

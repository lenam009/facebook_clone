import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';

import { Row, Col, Flex, Form, Input, Button, Divider } from 'antd';

import routes from '@/config/routes';

const cx = classNames.bind(styles);

export default function Login() {
    const [form] = Form.useForm();

    return (
        <Row className={cx('wrapper')}>
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
                        <Form
                            layout={'vertical'}
                            form={form}
                            // initialValues={{ layout: formLayout }}
                            // onValuesChange={onFormLayoutChange}
                        >
                            <Form.Item>
                                <Input className={cx('input')} placeholder="Email" />
                            </Form.Item>
                            <Form.Item>
                                <Input.Password
                                    className={cx('input')}
                                    placeholder="Mật khẩu"
                                />
                            </Form.Item>
                            <Form.Item style={{ marginBottom: 0 }}>
                                <Button
                                    size="large"
                                    className={cx('btn-login')}
                                    type="primary"
                                    block
                                >
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                        </Form>

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

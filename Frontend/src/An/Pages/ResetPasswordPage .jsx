import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Typography, Spin,message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Utils/axiosJS';

const { Text } = Typography;

export const ResetPasswordModal = ({ show, handleClose, signInLink }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // Step 1 = Email input, Step 2 = Password reset
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [forgotPasswordToken, setForgotPasswordToken] = useState(null);

    // Handle first step: Sending forgot password email
    const handleEmailSubmit = useCallback(async () => {
        setLoading(true);
        try {
            const email = emailRef.current.input.value.trim();
            if (email) {
                const response = await axiosInstance.post('/users/forgot-password', { email });
               message.success('Vui lòng kiểm tra hộp thư email của bạn để đặt lại mật khẩu.');
            } else {
                message.error('Vui lòng nhập địa chỉ email của bạn.');
            }
        } catch (error) {
            console.error('Error sending reset email:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('forgot_password_secrect_token');
        if (token) {
            setForgotPasswordToken(token);
            setLoading(true);
            axiosInstance.get('/users/verify-forgot-password', { params: { forgot_password_token: token } })
                .then(() => {
                    setStep(2);
                    localStorage.removeItem('forgot_password_secrect_token');
                })
                .catch(error => {
                    message.error('Token verification failed. Please request a new reset link.');
                    console.error('Token verification error:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, []);
    const translateErrorMessage = (error) => {
        switch (error) {
            case 'Email already exists':
                return 'Email đã tồn tại';
            case 'Password length must be from 8 to 50':
                return 'Mật khẩu phải từ 8 đến 50 ký tự';
            case 'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol':
                return 'Mật khẩu phải chứa ít nhất một số và một chữ cái viết hoa và viết thường, và ít nhất 8 ký tự';
            default:
                return error;
        }
    }
    const handlePasswordSubmit = useCallback(async () => {
        setLoading(true);
        try {
            const password = passwordRef.current.input.value.trim();
            const confirmPassword = confirmPasswordRef.current.input.value.trim();

            if (password && confirmPassword) {
                if (password === confirmPassword) {
                    await axiosInstance.post(`/users/reset-password?forgot_password_token=${forgotPasswordToken}`, {
                        password,
                        confirm_password: confirmPassword,
                    });
                    message.success('Mật khẩu của bạn đã được đặt lại thành công.');
                    handleClose();
                    localStorage.removeItem('forgot_password_secrect_token');
                    setStep(1);
                    navigate(signInLink);
                } else {
                    message.error('Mật khẩu và xác nhận mật khẩu không khớp.');
                }
            } else {
                message.error('Vui lòng nhập mật khẩu và xác nhận mật khẩu của bạn.');
            }
        } catch (error) {
            console.error('Error resetting password:', error);

            if (error.response) {
                const errorObj = error.response.data.errors
                if (errorObj.password) {
                    message.error(translateErrorMessage(errorObj.password));
                }
                if (errorObj.errors.email) {
                    message.error(translateErrorMessage(errorObj.email));
                }
            } else {
                message.error('Đã xảy ra lỗi khi đặt lại mật khẩu.');
            }

            console.error('Error resetting password:', error);
        } finally {
            setLoading(false);
        }
    }, [forgotPasswordToken, navigate, signInLink, handleClose]);

    return (
        <Modal
            open={show}
            onCancel={handleClose}
            footer={[
                <Button key="close" onClick={handleClose}>
                    Đóng
                </Button>
            ]}
            centered
            title={step === 1 ? 'Đặt lại mật khẩu' : 'Đặt mật khẩu mới'}
        >
            {step === 1 ? (
                <>
                    <Text>Vui lòng nhập địa chỉ email mà bạn đã sử dụng để đăng ký, chúng tôi sẽ gửi cho bạn liên kết để đặt lại mật khẩu qua email.</Text>
                    <Form layout="vertical" onFinish={handleEmailSubmit}>
                        <Form.Item label="Địa chỉ email" name="email" required>
                            <Input
                                type="email"
                                placeholder="Nhập email của bạn"
                                ref={emailRef}
                                disabled={loading}
                            />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Gửi liên kết đặt lại
                        </Button>
                    </Form>
                </>
            ) : (
                <>
                    <Text>Nhập mật khẩu mới của bạn và xác nhận nó bên dưới:</Text>
                    <Form layout="vertical" onFinish={handlePasswordSubmit}>
                        <Form.Item label="Mật khẩu mới" name="password" required>
                            <Input.Password
                                placeholder="Nhập mật khẩu mới"
                                ref={passwordRef}
                                disabled={loading}
                            />
                        </Form.Item>
                        <Form.Item label="Xác nhận mật khẩu" name="confirmPassword" required>
                            <Input.Password
                                placeholder="Xác nhận mật khẩu mới"
                                ref={confirmPasswordRef}
                                disabled={loading}
                            />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Đặt lại mật khẩu
                        </Button>
                    </Form>
                </>
            )}
        </Modal>
    );
};

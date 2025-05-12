/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import config from '~/config';
import taikhoanService from '../../../services/taikhoanService';

const cx = classNames.bind(styles);

function Login() {
    const [loginData, setLoginData] = useState({ taikhoan: '', matkhau: '' });
    const navigate = useNavigate();

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        taikhoanService
            .login(loginData)
            .then((res) => {
                toast.success('Đăng nhập thành công!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                setTimeout(() => {
                    navigate(config.routes.home);
                }, 2000);
            })
            .catch((err) => {
                toast.error('Đăng nhập thất bại!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                console.log(err);
            });
    };

    return (
        <div className={cx('login-container')}>
            <ToastContainer />
            <h2>Đăng nhập</h2>
            <form onSubmit={handleLoginSubmit}>
                <input
                    type="text"
                    name="taikhoan"
                    placeholder="Nhập tài khoản của bạn..."
                    value={loginData.taikhoan}
                    onChange={handleLoginChange}
                    required
                />
                <input
                    type="password"
                    name="matkhau"
                    placeholder="Nhập mật khẩu của bạn..."
                    value={loginData.matkhau}
                    onChange={handleLoginChange}
                    required
                />
                <button type="submit">Đăng nhập</button>
                <button style={{ marginTop: 16 }}>
                    <Link to={config.routes.register} style={{ color: 'white' }}>
                        Đăng ký
                    </Link>
                </button>
            </form>
        </div>
    );
}

export default Login;

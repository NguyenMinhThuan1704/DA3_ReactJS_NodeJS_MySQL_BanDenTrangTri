/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import config from '~/config';
import taikhoanService from '../../../services/taikhoanService';

const cx = classNames.bind(styles);

function Register() {
    const [registerData, setRegisterData] = useState({ TaiKhoan: '', MatKhau: '', Email: '', MaLoaiTK: 1 });
    const navigate = useNavigate();

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        taikhoanService
            .createTaiKhoan(registerData)
            .then((res) => {
                toast.success('Đăng ký thành công!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                setTimeout(() => {
                    navigate(config.routes.login);
                }, 2000);
            })
            .catch((err) => {
                toast.error('Đăng ký thất bại!', {
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
            <h2>Đăng ký</h2>
            <form onSubmit={handleRegisterSubmit}>
                <input
                    type="text"
                    name="TaiKhoan"
                    placeholder="Nhập tài khoản của bạn..."
                    value={registerData.TaiKhoan}
                    onChange={handleRegisterChange}
                    required
                />
                <input
                    type="email"
                    name="Email"
                    placeholder="Nhập email của bạn..."
                    value={registerData.Email}
                    onChange={handleRegisterChange}
                    required
                />
                <input
                    type="password"
                    name="MatKhau"
                    placeholder="Nhập mật khẩu của bạn..."
                    value={registerData.MatKhau}
                    onChange={handleRegisterChange}
                    required
                />
                {/* <input
                    type="password"
                    name="confirmMatKhau"
                    placeholder="Nhập lại mật khẩu..."
                    value={registerData.confirmMatKhau}
                    onChange={handleRegisterChange}
                    required
                /> */}
                <button type="submit">Đăng ký</button>
                <button style={{ marginTop: 16 }}>
                    <Link to={config.routes.login} style={{ color: 'white' }}>
                        Đăng nhập
                    </Link>
                </button>
            </form>
        </div>
    );
}

export default Register;

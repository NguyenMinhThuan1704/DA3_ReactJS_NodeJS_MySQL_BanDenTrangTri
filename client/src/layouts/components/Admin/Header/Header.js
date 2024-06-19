/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faSortDown, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import taikhoanService from '../../../../services/taikhoanService';
import config from '~/config';

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await taikhoanService.logout();
        localStorage.removeItem('taikhoan');
        navigate(config.routes.login);
    };

    return (
        <section className={cx('header')}>
            <div className={cx('title')}> Trang quản trị</div>
            <div className={cx('box-login')}>
                Xin chào, <span style={{ marginRight: 6 }}>Admin</span>
                <FontAwesomeIcon icon={faSortDown} />
                <div className={cx('box-login-bottom')}>
                    <button>
                        <FontAwesomeIcon icon={faUserAlt} />
                        Tài khoản
                    </button>
                    <button onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        Đăng xuất
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Header;

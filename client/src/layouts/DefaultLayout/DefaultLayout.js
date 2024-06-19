import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Banner from '~/layouts/components/User/Banner';
import Header from '~/layouts/components/User/Header';
import Footer from '~/layouts/components/User/Footer';
import Support from '~/layouts/components/User/Support';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Banner />
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
            <Support />
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;

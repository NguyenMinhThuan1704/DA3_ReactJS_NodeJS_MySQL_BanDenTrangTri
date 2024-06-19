import Header from '~/layouts/components/Admin/Header';
import Sidebar from '~/layouts/components/Admin/Sidebar';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    return (
        <div>
            <Header />
            <section className={cx('main')}>
                <div className={cx('row', 'all')} style={{ width: '100%' }}>
                    {/* <div className={cx('row', 'all')}> */}
                    <div className={cx('col-2', 'col-s-12', 'category')}>
                        <Sidebar />
                    </div>
                    <div className={cx('col-10', 'col-s-12', 'col-m-12', 'Details')}>
                        <div className={cx('container', 'col-12')}>
                            <div className={cx('content')}>{children}</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AdminLayout;

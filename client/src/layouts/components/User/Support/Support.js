import classNames from 'classnames/bind';
import styles from './Support.module.scss';
import img from '~/assets/img';

const cx = classNames.bind(styles);

function Support() {
    return (
        <div className={cx('support__fix')}>
            <div>
                {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
                <a
                    href="/"
                    className={cx('support__fix-link')}
                    style={{ backgroundImage: `url(${img.support.phone})` }}
                ></a>
            </div>
            <div>
                {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
                <a
                    href="/"
                    className={cx('support__fix-link')}
                    style={{ backgroundImage: `url(${img.support.zl})` }}
                ></a>
            </div>
            <div>
                {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
                <a
                    href="/"
                    className={cx('support__fix-link')}
                    style={{ backgroundImage: `url(${img.support.fb})` }}
                ></a>
            </div>
        </div>
    );
}

export default Support;

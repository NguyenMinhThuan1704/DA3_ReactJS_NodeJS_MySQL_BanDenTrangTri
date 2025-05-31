import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Support.module.scss';
import img from '~/assets/img';
import SupportAIModal from './SupportAIModal/SupportAIModal';

const cx = classNames.bind(styles);

function Support() {
    const [showModal, setShowModal] = useState(false);
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
            <div>
                {/* eslint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid */}
                <a
                    href="#"
                    className={cx('support__fix-link')}
                    style={{ backgroundImage: `url(${img.support.ai})` }}
                    onClick={(e) => {
                        e.preventDefault();
                        setShowModal(true);
                    }}
                ></a>
            </div>
            <SupportAIModal isShow={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
}

export default Support;

/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import styles from './Option.module.scss';

const cx = classNames.bind(styles);

function Option({title}) {
    return ( 
        <li>
            <h3 className={cx('title_h3')}>
                <a title={title}>{title}</a>
            </h3>
        </li> 
    );
}

export default Option;
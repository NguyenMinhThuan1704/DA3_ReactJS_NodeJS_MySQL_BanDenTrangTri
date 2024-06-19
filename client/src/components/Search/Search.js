import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search({value, onChange}) {
    return ( 
        <>
            <input
                type="text"
                placeholder="Nhập nội dung tìm kiếm..."
                value={value}
                onChange={onChange}
                className={cx('inputSearch')}
            />
            <FontAwesomeIcon icon={faSearch} className={cx('iconSearch')} />
        </>
     );
}

export default Search;
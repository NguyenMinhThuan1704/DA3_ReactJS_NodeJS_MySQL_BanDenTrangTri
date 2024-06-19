import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import { NavLink } from 'react-router-dom';
const cx = classNames.bind(styles);

function Category({id, title}) {
    return ( 
        <li className={cx('subnav-item')}>
            <NavLink
                className={(nav) => cx('menu-item')}
                to={`/user/danhmuc/${id}`}
            >
                {title}
            </NavLink>
        </li>
     );
}

export default Category;
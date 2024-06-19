/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from 'classnames/bind';
import styles from './ThongKe.module.scss';
import React, { useState } from 'react';

import HoaDonBan from './HoaDonBan/HoaDonBan';
import HoaDonNhap from './HoaDonNhap/HoaDonNhap';
const cx = classNames.bind(styles);

function ThongKe() {
    const [activeTab, setActiveTab] = useState('Tab1');

    const openTab = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <div className={cx('col-12', 'col-s-12', 'tab')}>
            <button
                className={cx('tablinks', { active: activeTab === 'Tab1' })}
                onClick={() => openTab('Tab1')}
                id="defaultOpen"
            >
                Thống kê hóa đơn nhập
            </button>
            <button className={cx('tablinks', { active: activeTab === 'Tab2' })} onClick={() => openTab('Tab2')}>
                Thống kê hóa đơn bán
            </button>

            <div className={cx('col-12', 'col-s-12', 'content')}>
                <div
                    id="Tab1"
                    className={cx('tabcontent', { active: activeTab === 'Tab1' })}
                    style={{ display: activeTab === 'Tab1' ? 'block' : 'none' }}
                >
                    <HoaDonNhap />
                </div>
            </div>

            <div className={cx('col-12', 'col-s-12', 'content')}>
                <div
                    id="Tab2"
                    className={cx('tabcontent', { active: activeTab === 'Tab2' })}
                    style={{ display: activeTab === 'Tab2' ? 'block' : 'none' }}
                >
                    <HoaDonBan />
                </div>
            </div>
        </div>
    );
}

export default ThongKe;

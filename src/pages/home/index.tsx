import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Header from 'components/Header';

const cx = classNames.bind(styles);

export default function Home() {
    return <div className={cx('wrapper')}>This a home</div>;
}

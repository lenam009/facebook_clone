import styles from './ButtonRightBarAd.module.scss';

import { Flex } from 'antd';

interface IProps {
    image: string;
    title: string;
    desc: string;
}
export default function ButtonRightBarAd({
    image = 'data:image/png;base64,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',
    title,
    desc,
}: IProps) {
    return (
        <Flex gap={10} className={styles['wrapper']}>
            <img src={image} className={styles['image']} alt="error" />
            <div style={{ marginTop: '12px' }}>
                <h4 className={styles['title']}>{title}</h4>
                <span className={styles['desc']}>{desc}</span>
            </div>
        </Flex>
    );
}

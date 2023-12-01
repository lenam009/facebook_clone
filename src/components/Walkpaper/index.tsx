import classNames from 'classnames/bind';
import styles from './Walkpaper.module.scss';

import { Image, Avatar, Flex } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { IUser } from '@/api/userApi';

const cx = classNames.bind(styles);
const local = process.env.REACT_APP_PUBLIC_FOLDER_IMAGE;

interface IProps {
    user: IUser | null;
}
export default function Walkpaper({ user }: IProps) {
    // const user = useAppSelector(getUserCurrentSelector);

    return (
        <div className={cx('wrapper')}>
            <Image
                width={'100%'}
                height={'250px'}
                className={cx('img')}
                crossOrigin="anonymous"
                alt="error"
                src={local + 'post/' + user?.coverPicture}
                fallback="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALsAxwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAABAAIGB//EABUQAQEAAAAAAAAAAAAAAAAAAAAB/8QAGQEBAQEBAQEAAAAAAAAAAAAAAgEFAwAG/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwDz6NQNR9oijUEagUoo1IoYhxRqIwTJgjQlFGlDBMyGKGCRKMQ4YYoYNKGGKGDXSRRqCNSJSwwxQgcMRiQnNxqCNRq1hKNQSNQDhhihiUjDEYlKEyKEDUaihg0oYYoRpmGKGQThhRglFGooYJmNQRqJTihijUGlIojEh45yGCNSNRhQwowShMUhiUzCjAOGGKGCRhihiETFDBKGNQSEThMUMGukMMUagko0I1ApRRqCNRK6RRGISc5DFC1mDDDEYJkxQiUMKMEzDE1BOKFGCRMUaiHFDFDBOGGJqRKUUagjQGo1BGhOKNQSNQSiiaiQ3NwxQxqsKGGIwaRhihg04YYo1BpKGKGDSMMTUGnFGoCNKGGKGIchjUEagniagjUEpFGoI1BdIYYoYJQxGITxzcKhjWrBMMUagHFDFGoNJRqBqIUTUEagmpGoI0JRNQNQa6RRqCNQSUagagU5FGoI1EOGGIwKcMhkUKFhiMiEsc3CoY1mEYU1BpRRqCNQaajUDUGlFGoI1BNNQQwThjUEaj1KKNQRqAakagjUSnFGooYBSGGKFK6QwxRqASiMQljm41BDGswoY1BI1BpKNQRqDSijUEag01GoGoNKKNCNRK6RRqKECiagjUQ8MMUMEoYYoQrpIYYo1ELFGhGoFOKIxPE5tqCNRqVgqNQRqIUTUEagV0ijUUMSko1BGoNOKNRSGCcMMDUClIYYjEMyGKGCcJihglDGoI0JqNQRqCcMRieJzUagjUajBUagaClIo1BGkPCYI1BORRqCNR6lDDFDAOGGKGJTMMUMAoZGoIYlOQxqQSNQHSRRqBqDSMKhg0oUYhPHNRpQxrVgxRqCNQaRhUMGlFGoI1ErpDDFCBQmRQxK6SGGKNQCxRqCNRDkUagakE5FGlDApSKNRQpTwwxQxKchiMQFjmmhGo1WDDCoUJRqCNQShhkUMF0hhgagUoYYoYlMxqCNRKcUagIFDGoI0FdIo1BGolIwxQxChhgjUGukMRiQn//Z"
            />
            <Flex vertical align="center" className={cx('wrapper-avatar')}>
                <Avatar
                    crossOrigin="anonymous"
                    size={156}
                    icon={<UserOutlined />}
                    src={local + 'person/' + user?.profilePicture}
                />
                <h1 className={cx('name')}>{user?.username}</h1>
                <p className={cx('desc')}>{user?.desc}</p>
            </Flex>
        </div>
    );
}

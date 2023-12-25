import styles from './walkpaper.user.module.scss';

import { Image, Avatar, Flex } from 'antd';
import { UserOutlined } from '@ant-design/icons';

interface IProps {
    user: IUser | null;
}
export default function Walkpaper({ user }: IProps) {
    // const user = useAppSelector(getUserCurrentSelector);

    const user1 = {
        _id: '657fb2b2902a695ddb00259c',
        username: 'admin',
        email: 'admin@gmail.com',
        profilePicture: '',
        coverPicture: '',
        followers: [],
        followings: ['6584304d7f0d80d9ee444605', '65843d9edfd97497a727581d'],
        isAdmin: true,
        desc: '',
        city: 'New York 123 456',
        from: '',
        createdAt: '2023-12-18T02:47:14.717Z',
        updatedAt: '2023-12-23T08:45:18.073Z',
        __v: 0,
    };

    return (
        <div className={styles['wrapper']}>
            <Image
                width={'100%'}
                height={'250px'}
                className={styles['img']}
                fallback="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALsAxwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAABAAIGB//EABUQAQEAAAAAAAAAAAAAAAAAAAAB/8QAGQEBAQEBAQEAAAAAAAAAAAAAAgEFAwAG/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwDz6NQNR9oijUEagUoo1IoYhxRqIwTJgjQlFGlDBMyGKGCRKMQ4YYoYNKGGKGDXSRRqCNSJSwwxQgcMRiQnNxqCNRq1hKNQSNQDhhihiUjDEYlKEyKEDUaihg0oYYoRpmGKGQThhRglFGooYJmNQRqJTihijUGlIojEh45yGCNSNRhQwowShMUhiUzCjAOGGKGCRhihiETFDBKGNQSEThMUMGukMMUagko0I1ApRRqCNRK6RRGISc5DFC1mDDDEYJkxQiUMKMEzDE1BOKFGCRMUaiHFDFDBOGGJqRKUUagjQGo1BGhOKNQSNQSiiaiQ3NwxQxqsKGGIwaRhihg04YYo1BpKGKGDSMMTUGnFGoCNKGGKGIchjUEagniagjUEpFGoI1BdIYYoYJQxGITxzcKhjWrBMMUagHFDFGoNJRqBqIUTUEagmpGoI0JRNQNQa6RRqCNQSUagagU5FGoI1EOGGIwKcMhkUKFhiMiEsc3CoY1mEYU1BpRRqCNQaajUDUGlFGoI1BNNQQwThjUEaj1KKNQRqAakagjUSnFGooYBSGGKFK6QwxRqASiMQljm41BDGswoY1BI1BpKNQRqDSijUEag01GoGoNKKNCNRK6RRqKECiagjUQ8MMUMEoYYoQrpIYYo1ELFGhGoFOKIxPE5tqCNRqVgqNQRqIUTUEagV0ijUUMSko1BGoNOKNRSGCcMMDUClIYYjEMyGKGCcJihglDGoI0JqNQRqCcMRieJzUagjUajBUagaClIo1BGkPCYI1BORRqCNR6lDDFDAOGGKGJTMMUMAoZGoIYlOQxqQSNQHSRRqBqDSMKhg0oUYhPHNRpQxrVgxRqCNQaRhUMGlFGoI1ErpDDFCBQmRQxK6SGGKNQCxRqCNRDkUagakE5FGlDApSKNRQpTwwxQxKchiMQFjmmhGo1WDDCoUJRqCNQShhkUMF0hhgagUoYYoYlMxqCNRKcUagIFDGoI0FdIo1BGolIwxQxChhgjUGukMRiQn//Z"
                alt="error"
                src={process.env.NEXT_PUBLIC_BACKEND_URL + '/images/post/' + '1.jpeg'}
            />
            <Flex vertical align="center" className={styles['wrapper-avatar']}>
                <Avatar
                    size={156}
                    icon={<UserOutlined />}
                    src={
                        process.env.NEXT_PUBLIC_BACKEND_URL + '/images/person/' + '1.jpeg'
                    }
                />
                <h1 className={styles['name']}>{user1?.username}</h1>
                <p className={styles['desc']}>{user1?.desc}</p>
            </Flex>
        </div>
    );
}

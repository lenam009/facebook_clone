import styles from './walkpaper.user.module.scss';

import { Image, Avatar, Flex, Button } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import Box from '@mui/material/Box';
import Link from 'next/link';
import routes from '@/config/routes/routes';
import { getUserSelector } from '@/utils/redux/userSlice';
import { useAppSelector } from '@/utils/redux/hook';

interface IProps {
    user: IUser | undefined;
}
export default function Walkpaper({ user }: IProps) {
    const currentUser = useAppSelector(getUserSelector);

    return (
        <div className={styles['wrapper']}>
            <Image
                width={'100%'}
                height={'250px'}
                className={styles['img']}
                fallback="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALsAxwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAABAAIGB//EABUQAQEAAAAAAAAAAAAAAAAAAAAB/8QAGQEBAQEBAQEAAAAAAAAAAAAAAgEFAwAG/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwDz6NQNR9oijUEagUoo1IoYhxRqIwTJgjQlFGlDBMyGKGCRKMQ4YYoYNKGGKGDXSRRqCNSJSwwxQgcMRiQnNxqCNRq1hKNQSNQDhhihiUjDEYlKEyKEDUaihg0oYYoRpmGKGQThhRglFGooYJmNQRqJTihijUGlIojEh45yGCNSNRhQwowShMUhiUzCjAOGGKGCRhihiETFDBKGNQSEThMUMGukMMUagko0I1ApRRqCNRK6RRGISc5DFC1mDDDEYJkxQiUMKMEzDE1BOKFGCRMUaiHFDFDBOGGJqRKUUagjQGo1BGhOKNQSNQSiiaiQ3NwxQxqsKGGIwaRhihg04YYo1BpKGKGDSMMTUGnFGoCNKGGKGIchjUEagniagjUEpFGoI1BdIYYoYJQxGITxzcKhjWrBMMUagHFDFGoNJRqBqIUTUEagmpGoI0JRNQNQa6RRqCNQSUagagU5FGoI1EOGGIwKcMhkUKFhiMiEsc3CoY1mEYU1BpRRqCNQaajUDUGlFGoI1BNNQQwThjUEaj1KKNQRqAakagjUSnFGooYBSGGKFK6QwxRqASiMQljm41BDGswoY1BI1BpKNQRqDSijUEag01GoGoNKKNCNRK6RRqKECiagjUQ8MMUMEoYYoQrpIYYo1ELFGhGoFOKIxPE5tqCNRqVgqNQRqIUTUEagV0ijUUMSko1BGoNOKNRSGCcMMDUClIYYjEMyGKGCcJihglDGoI0JqNQRqCcMRieJzUagjUajBUagaClIo1BGkPCYI1BORRqCNR6lDDFDAOGGKGJTMMUMAoZGoIYlOQxqQSNQHSRRqBqDSMKhg0oUYhPHNRpQxrVgxRqCNQaRhUMGlFGoI1ErpDDFCBQmRQxK6SGGKNQCxRqCNRDkUagakE5FGlDApSKNRQpTwwxQxKchiMQFjmmhGo1WDDCoUJRqCNQShhkUMF0hhgagUoYYoYlMxqCNRKcUagIFDGoI0FdIo1BGolIwxQxChhgjUGukMRiQn//Z"
                alt="error"
                src={
                    process.env.NEXT_PUBLIC_BACKEND_URL +
                    '/images/person/' +
                    `${user?.coverPicture}`
                }
            />
            <Flex vertical align="center" className={styles['wrapper-avatar']}>
                <Avatar
                    size={156}
                    icon={<UserOutlined />}
                    src={
                        process.env.NEXT_PUBLIC_BACKEND_URL +
                        '/images/person/' +
                        user?.profilePicture
                    }
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h1 className={styles['name']}>{user?.username}</h1>
                    {currentUser?._id === user?._id && (
                        <Link href={routes.editUser.path}>
                            <Button
                                type="text"
                                icon={<EditOutlined />}
                                shape="circle"
                            ></Button>
                        </Link>
                    )}
                </Box>
                <p className={styles['desc']}>{user?.desc}</p>
            </Flex>
        </div>
    );
}

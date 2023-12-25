import { Col, Row } from 'antd';
import LeftBar from '@/components/LeftBar/leftbar.home';
import Feed from '@/components/Feed/feed';
import RightBar from '@/components/Home/RightBar/rightbar.home';
import {
    handleGetUserRandomAction,
    handleGetUserByFollowing,
} from '@/utils/actions/actions';

const user = {
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

export default async function HomePage() {
    const userRandom = await handleGetUserRandomAction();

    const userByFolowing = await handleGetUserByFollowing();

    return (
        <Row>
            <Col span={4}>
                <LeftBar user={userRandom.data} />
            </Col>
            <Col span={16} style={{ minHeight: '200vh' }}>
                <Feed user={user} />
            </Col>
            <Col span={4}>
                <RightBar user={userByFolowing.data} />
            </Col>
        </Row>
    );
}

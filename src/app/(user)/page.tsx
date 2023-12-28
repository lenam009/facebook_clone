import { Col, Row } from 'antd';
import LeftBar from '@/components/LeftBar/leftbar.home';
import Feed from '@/components/Feed/feed';
import RightBar from '@/components/Home/RightBar/rightbar.home';
import {
    handleGetUserRandomAction,
    handleGetUserByFollowing,
    handleGetPostsFollowing,
} from '@/utils/actions/actions';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function HomePage() {
    const session = await getServerSession(authOptions);

    const userRandom = await handleGetUserRandomAction();

    const userByFolowing = await handleGetUserByFollowing(session?.user._id!);

    const postsFollowing = await handleGetPostsFollowing();

    return (
        <Row>
            <Col span={4}>
                <LeftBar user={userRandom.data} />
            </Col>
            <Col span={15}>
                <Feed user={undefined} home={true} posts={postsFollowing.data?.result} />
            </Col>
            <Col span={5}>
                <RightBar user={userByFolowing.data} />
            </Col>
        </Row>
    );
}

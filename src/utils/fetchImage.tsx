import { GithubOutlined, GoogleOutlined, UserOutlined } from '@ant-design/icons';

export const FetchDefaltImages = (type: string) => {
    if (type === 'GITHUB') return <GithubOutlined />;
    if (type === 'GOOGLE') return <GoogleOutlined />;
    if (type) return type;

    return <UserOutlined />;
};

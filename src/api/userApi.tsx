import axiosCreate from '.';

interface IUser {
    access_token?: string;
    refresh_token?: string;
    _id?: string;
    username: string;
    password: string;
    email: string;
    profilePicture: string;
    coverPicture: string;
    followers: string[];
    followings: string[];
    isAdmin: boolean;
    desc: string;
    city: string;
    from: string;
    relationship: number;
    createdAt: string;
    updatedAt: string;
}

const userApi = {
    getOneUser(idUser: string, username?: string) {
        const url = 'user';

        return axiosCreate
            .get(url, {
                params: {
                    _id: idUser,
                    username,
                },
            })
            .then((response) => response)
            .catch(() => console.log('Error GetOneUser'));
    },

    getAllUser() {
        const url = 'user/getall';

        return axiosCreate
            .get(url)
            .then((response) => response)
            .catch(() => console.log('Error GetAllUser'));
    },

    followOrUnfollow(isfollow: boolean, userid: string, userIdFollowed: string) {
        const follow = isfollow ? 'follow' : 'unfollow';

        const url = 'user/' + userIdFollowed + '/' + follow;

        return axiosCreate
            .put(url, {
                _id: userid,
            })
            .then((response) => response)
            .catch(() => console.log('Error FollowOrUnfollow'));
    },
};

export default userApi;
export type { IUser };

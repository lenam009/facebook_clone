import axiosCreate from '.';

interface IUser {
    _id?: string;
    username: string;
    password: string;
    email: string;
    profilePicture: string;
    coverPicture: string;
    followers: [];
    followings: [];
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
};

export default userApi;
export type { IUser };

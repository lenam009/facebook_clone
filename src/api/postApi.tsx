import axiosCreate from '.';

interface IPost {
    _id?: string;
    userId: string;
    desc: string;
    img: string;
    likes: string[];
    createdAt: string;
    updatedAt: string;
}

const postApi = {
    getPostByFollowing(idUser: string) {
        const url = 'post/timeline/' + idUser;

        return axiosCreate
            .get(url)
            .then((response) => response)
            .catch(() => console.log('Error GetPostByFollowing'));
    },

    getPostByUsername(username: string) {
        const url = 'post/profile/' + username;

        return axiosCreate
            .get(url)
            .then((response) => response)
            .catch(() => console.log('Error GetPostByUsername'));
    },

    likeOrDislikePost(idPost: string, userId: string) {
        const url = 'post/' + idPost + '/like';

        return axiosCreate
            .put(url, {
                userId,
            })
            .then((response) => response)
            .catch(() => console.log('Error LikeOrDislikePost'));
    },
};

export default postApi;
export type { IPost };

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
            .catch((error) => {
                console.log('Error GetPostByFollowing');
                return error;
            });
    },

    getPostByUsername(username: string) {
        const url = 'post/profile/' + username;

        return axiosCreate
            .get(url)
            .then((response) => response)
            .catch((error) => {
                console.log('Error GetPostByUsername');
                return error;
            });
    },

    likeOrDislikePost(idPost: string, userId: string) {
        const url = 'post/' + idPost + '/like';

        return axiosCreate
            .put(url, {
                userId,
            })
            .then((response) => response)
            .catch((error) => {
                console.log('Error LikeOrDislikePost');
                return error;
            });
    },

    create(userId: string, desc: string, img: string) {
        const url = 'post';

        return axiosCreate
            .post(url, {
                userId,
                desc,
                img,
            })
            .then((response) => response)
            .catch((error) => {
                console.log('Error Create');
                return error;
            });
    },

    uploadFile(data: FormData) {
        const url = 'upload';

        return axiosCreate
            .post(url, data)
            .then((response) => response)
            .catch((error) => {
                console.log('Error UploadFile');
                return error;
            });
    },
};

export default postApi;
export type { IPost };

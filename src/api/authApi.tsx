import axiosCreate from '.';
import { IUser } from './userApi';

interface IAuth {
    successful?: boolean;
    message?: string;
    token?: string;
    isAdmin?: boolean;
    user?: IUser;
    data?: any;
}

const authApi = {
    login(email: string, password: string) {
        const url = 'auth/login';

        return (
            axiosCreate
                .post(url, {
                    email,
                    password,
                })
                // .then((response) => response)
                .catch(() => {
                    console.log('Error login');
                    return null;
                }) as Promise<IBackendRes<any> | null>
        );
    },

    register(email: string, password: string, username: string) {
        const url = 'auth/register';

        return axiosCreate
            .post(url, {
                email,
                password,
                username,
            })
            .then((response) => {
                return response;
            })
            .catch(() => console.log('Error register')) as Promise<IAuth>;
    },
};

export default authApi;
export type { IAuth };

import axios from 'axios';
import { AxiosInstance } from 'axios';
import { useAppSelector } from '@/redux/hook';
import { getUserCurrentSelector } from '@/redux/userSlice';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';

const axiosCreate: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8088/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

const AxiosRequestHandler = ({ children }: { children: any }) => {
    const currentUser = useAppSelector(getUserCurrentSelector);

    // useEffect(() => {
    //     const responseInterceptor = axiosCreate.interceptors.request.use(
    //         async function (config) {
    //             if (currentUser && currentUser.access_token) {
    //                 const currentDate = new Date();
    //                 const decodeAccessToken = jwtDecode(currentUser.access_token);

    //                 console.log('currentUser', currentUser);

    //                 if (decodeAccessToken.exp! < currentDate.getTime() / 1000) {
    //                     const data = await axiosCreate
    //                         .get('user?username=jamas0092', {
    //                             withCredentials: true,
    //                         })
    //                         .then((res) => {
    //                             console.log('res', res);
    //                              config.header['token']='Bearer ${}'
    //                             // return res;
    //                         })
    //                         .catch((error) => {
    //                             console.log('error');
    //                             // return error;
    //                         });

    //                     // console.log('data', data);
    //                 }
    //             }

    //             return config;
    //         },
    //         function (error) {
    //             return Promise.reject(error);
    //         },
    //     );

    //     return () => {
    //         axiosCreate.interceptors.request.eject(responseInterceptor);
    //     };
    // }, [currentUser?.isAdmin]);

    return children;
};

axiosCreate.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error.response.data);
    },
);

export default axiosCreate;
export { AxiosRequestHandler };

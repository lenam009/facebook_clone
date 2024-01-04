import axios from 'axios';
import { AxiosInstance } from 'axios';
import { useAppSelector } from '@/redux/hook';
import { getUserCurrentSelector } from '@/redux/userSlice';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useRef } from 'react';
import { message } from 'antd';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosCreate: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8088/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosCreate.defaults.withCredentials = true;

axiosCreate.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
    'access_token',
)}`;

// const AxiosRequestHandler = ({ children }: { children: any }) => {
//     const currentUser = useAppSelector(getUserCurrentSelector);

//     const currentUserRef = useRef(currentUser);

//     useEffect(() => {
//         const responseInterceptor = axiosCreate.interceptors.request.use(
//             async function (config) {
//                 if (currentUserRef && currentUserRef.current) {
//                     const currentDate = new Date();
//                     const decodeAccessToken = jwtDecode(currentUserRef.current.access_token!);

//                     console.log('currentUser', currentUser);

//                     if (decodeAccessToken.exp! < currentDate.getTime() / 1000) {
//                         const data = await axiosCreate
//                             .get('auth/refresh', {
//                                 withCredentials: true,
//                             })
//                             .then((res) => {
//                                 console.log('res', res);
//                                 // config.header['token'] = 'Bearer ${res.access_token}';
//                                 // return res;
//                             })
//                             .catch((error) => {
//                                 console.log('error', error);
//                                 // return error;
//                             });

//                         // console.log('data', data);
//                     }
//                 }

//                 return config;
//             },
//             function (error) {
//                 return Promise.reject(error);
//             },
//         );

//         return () => {
//             axiosCreate.interceptors.request.eject(responseInterceptor);
//         };
//     }, [currentUserRef.current]);

//     useEffect(() => {
//         currentUserRef.current = currentUser;
//     }, [currentUser]);

//     return children;
// };

axiosCreate.interceptors.response.use(
    //@ts-ignore
    function (response: AxiosResponse) {
        return response.data;
    },
    function (error: AxiosError<IBackendRes<any>>) {
        message.error(error.response?.data.message);
        return Promise.reject(error.response?.data);
    },
);

export default axiosCreate;
// export { AxiosRequestHandler };

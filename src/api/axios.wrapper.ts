import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/redux/hook';
import { getUserCurrentSelector } from '@/redux/userSlice';
import { jwtDecode } from 'jwt-decode';

export const AxiosWrapper = () => {
    const axiosInstance = useRef(axios.create());

    const currentUser = useAppSelector(getUserCurrentSelector);

    const currentUserRef = useRef(currentUser);

    useEffect(() => {
        const requestInterceptor = axiosInstance.current.interceptors.request.use(
            async (config) => {
                // Thực hiện các thao tác khác trước khi gửi request

                if (currentUserRef && currentUserRef.current) {
                    const currentDate = new Date();
                    const decodeAccessToken = jwtDecode(currentUserRef.current.access_token!);

                    console.log('currentUser', currentUser);

                    if (decodeAccessToken.exp! < currentDate.getTime() / 1000) {
                        const data = await axios
                            .get('auth/refresh', {
                                withCredentials: true,
                            })
                            .then((res) => {
                                console.log('res', res);
                                // config.header['token'] = 'Bearer ${}';
                                // return res;
                            })
                            .catch((error) => {
                                console.log('error', error);
                                // return error;
                            });

                        // console.log('data', data);
                    }
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            },
        );

        const responseInterceptor = axiosInstance.current.interceptors.response.use(
            (response) => {
                // Thực hiện các thao tác khác sau khi nhận được response
                return response;
            },
            (error) => {
                return Promise.reject(error);
            },
        );

        // Cleanup function để loại bỏ interceptor khi component unmount
        return () => {
            axiosInstance.current.interceptors.request.eject(requestInterceptor);
            axiosInstance.current.interceptors.response.eject(responseInterceptor);
        };
    }, [currentUser]);

    return { axiosInstance: axiosInstance.current };
};

import React from 'react';
import axiosCreate from '@/api';
import { useState, useEffect } from 'react';
import { IUser } from '@/api/userApi';
import { useAppSelector } from '@/redux/hook';
import { getUserCurrentSelector } from '@/redux/userSlice';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import routes from '@/config/routes';
import { message } from 'antd';

const userArray = [
    { id: 1, name: 'le' },
    { id: 1, name: 'le' },
    { id: 1, name: 'le' },
];

export default function UsersPage() {
    const [users, setUsers] = useState<IUser[]>([]);
    const navigate = useNavigate();

    const currentUser = useAppSelector(getUserCurrentSelector);

    useEffect(() => {
        if (!currentUser) {
            navigate(routes.login);
        }

        axiosCreate
            .get('user/getall', {
                headers: {
                    Authorization: 'Bearer ' + currentUser?.access_token,
                },
            })
            .then((response: any) => {
                setUsers(response);
            })
            .catch(function (error) {
                console.log('error', error);
            });
    }, []);

    const handleDelete = async (id: string | undefined) => {
        if (id) {
            axiosCreate
                .delete(`user/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + currentUser?.access_token,
                    },
                    data: {
                        _id: currentUser?._id,
                    },
                })
                .then((response: any) => {
                    console.log(response);
                    message.success(JSON.stringify(response));
                })
                .catch(function (error) {
                    // console.log('error', error);
                    message.error(JSON.stringify(error));
                });

            const data = await axiosCreate
                .get('auth/refresh', {
                    withCredentials: true,
                    headers: {
                        'Content-type': 'application/json',
                    },
                })
                .then((res) => {
                    console.log('res', res);
                    // return res;
                })
                .catch((error) => {
                    console.log('error', error);
                    // return error;
                });
        }
    };

    return (
        <div style={{ padding: 32 }}>
            <h2>Is admin: {currentUser?.isAdmin.toString()}</h2>
            <ul>
                {users?.map((x) => (
                    <li key={x._id}>
                        <span style={{ fontSize: '3rem' }}>{x.username}</span>
                        <button
                            style={{ fontSize: '3rem', marginLeft: 8 }}
                            onClick={() => handleDelete(x._id)}
                        >
                            &times;
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

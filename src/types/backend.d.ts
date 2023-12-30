export {};
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }

    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: T[];
    }

    interface IUser {
        _id: string;
        username: string;
        email: string;
        profilePicture: string;
        coverPicture: string;
        followers: string[];
        followings: string[];
        isAdmin: boolean;
        desc: string;
        city: string;
        from: string;
        relationship?: number;
        createdAt: string;
        updatedAt: string;
        __v?: any;
    }

    interface IPost {
        _id?: string;
        userId: string;
        desc: string;
        img?: string;
        likes: string[];
        createdAt: string;
        updatedAt: string;
        video?: string;
    }
}

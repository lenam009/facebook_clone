import queryString from 'query-string';
import slugify from 'slugify';

export const sendRequest = async <T>(props: IRequest) => {
    let {
        url,
        method,
        body,
        queryParams = {},
        useCredentials = false,
        headers = {},
        nextOption = {},
    } = props;

    const options: any = {
        method: method,
        // by default setting the content-type to be json type
        headers: new Headers({ 'content-type': 'application/json', ...headers }),
        body: body ? JSON.stringify(body) : null,
        ...nextOption,
    };
    if (useCredentials) options.credentials = 'include';

    if (queryParams) {
        url = `${url}?${queryString.stringify(queryParams)}`;
    }

    return fetch(url, options).then((res) => {
        if (res.ok) {
            return res.json() as T;
        } else {
            // return Promise.reject(res);
            return res.json().then(function (json) {
                // to be able to access error status when you catch the error
                return Promise.reject({
                    statusCode: res.status,
                    message: json?.message ?? '',
                    error: json?.error ?? '',
                } as T);
            });
        }
    });
    // .catch((res) => {
    //     return res;
    // }) as T;
};

export const sendRequestFile = async <T>(props: IRequest) => {
    let {
        url,
        method,
        body,
        queryParams = {},
        useCredentials = false,
        headers = {},
        nextOption = {},
    } = props;

    const options: any = {
        method: method,
        // by default setting the content-type to be json type
        headers: new Headers({ ...headers }),
        body: body ?? null,
        ...nextOption,
    };
    if (useCredentials) options.credentials = 'include';

    if (queryParams) {
        url = `${url}?${queryString.stringify(queryParams)}`;
    }

    return fetch(url, options)
        .then((res) => {
            if (res.ok) {
                return res.json() as T;
            } else {
                return res.json().then(function (json) {
                    // to be able to access error status when you catch the error
                    return Promise.reject({
                        statusCode: res.status,
                        message: json?.message ?? '',
                        error: json?.error ?? '',
                    } as T);

                    // return {
                    //     statusCode: res.status,
                    //     message: json?.message ?? '',
                    //     error: json?.error ?? '',
                    // } as T;
                });
            }
        })
        .catch((error) => error);
};

export const convertSlugUrl = (str: string | undefined) => {
    if (!str) return '';

    return slugify(str, {
        lower: true,
        locale: 'vi',
    });
};

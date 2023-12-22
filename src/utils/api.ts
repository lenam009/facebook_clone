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

    return fetch(url, options)
        .then((res) => {
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
        })
        .catch((res) => {
            return res;
        }) as T;
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

    return fetch(url, options).then((res) => {
        if (res.ok) {
            return res.json() as T;
        } else {
            return res.json().then(function (json) {
                // to be able to access error status when you catch the error
                return {
                    statusCode: res.status,
                    message: json?.message ?? '',
                    error: json?.error ?? '',
                } as T;
            });
        }
    });
};

export const fetchDefaltImages = (type: string) => {
    if (type === 'GITHUB')
        return 'data:image/jpeg;base64,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';
    if (type === 'GOOGLE')
        return 'data:image/jpeg;base64,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';
    return 'data:image/png;base64,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';
};

export const convertSlugUrl = (str: string) => {
    if (!str) return '';

    return slugify(str, {
        lower: true,
        locale: 'vi',
    });
};

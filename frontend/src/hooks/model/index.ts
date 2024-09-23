import {NextApiResponse} from "next";

export interface ApiErrorItem {
    message: string;
    code: string;
    accessRevoked: boolean;
}
export function isApiErrorItem(obj: any): obj is ApiErrorItem {
    return typeof obj?.message === 'string' &&
        typeof obj?.message === 'string' &&
        typeof obj?.accessRevoked === 'boolean';

}

export function resolveApiError(parsed: any, errorCodes: ErrorItem[], res: NextApiResponse) {
    if(!isApiErrorItem(parsed)) {
        return res.status(500).json({message: 'Wystąpił błąd'});
    }
    if(parsed.code === 'invalid_jwt_token') {
        res.status(403).json({message: 'Logowanie wymagane'})
    }
    const errorItem = errorCodes.find(item => item.apiCode === parsed.code);
    if(!errorItem) {
        return res.status(500).json({message: 'Wystąpił błąd'});
    }
    return res.status(500).json({message: errorItem.message});
}

export interface ErrorItem {
    apiCode: string;
    message: string;
}
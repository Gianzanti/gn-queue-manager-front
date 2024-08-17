import axios from 'axios';
import { CREATE_VISITOR_ENDPOINT } from '../constants';
import { Visitor } from '../types';

export const insertVisitor = async (data: Visitor) => {
    const response = await axios.post(CREATE_VISITOR_ENDPOINT, data);
    return response.data;
};

export const fetchVisitors = async (): Promise<Visitor[]> => {
    const { data } = await axios.get(CREATE_VISITOR_ENDPOINT);
    return data;
};

export const deleteVisitor = async (id: number) => {
    await axios.delete(`${CREATE_VISITOR_ENDPOINT}/${id}`);
};

// const config: AxiosRequestConfig = {
//     headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         Authorization: `Bearer ${USIGN_TOKEN}`,
//         'x-domain': USIGN_DOMAIN_ID,
//     },
//     baseURL: FUSION_API_BASE,
//     timeout: 10 * 1000,
//     params: {
//         noCache: 'true',
//         perPage: '100',
//         page: '1',
//     },
// };

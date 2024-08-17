import axios from 'axios';
import { CREATE_VISITOR_ENDPOINT } from '../constants';
import { Visitor } from '../types';

export const createVisitor = async (data: Visitor) => {
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

export const updateVisitor = async (visitor: Visitor): Promise<Visitor> => {
    const { data } = await axios.put(`${CREATE_VISITOR_ENDPOINT}/${visitor.id}`, visitor);
    return data;
};

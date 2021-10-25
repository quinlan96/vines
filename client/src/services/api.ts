import axios, { AxiosPromise } from 'axios';
import Vine from '../entities/Vine';

console.log(process.env);

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  responseType: 'json',
});

export enum ApiStatus {
    success,
    fail,
    error,
}

export interface ApiData<T> {
    status: ApiStatus;
    data: T;
}

// ApiResponse returned by all api functions
export type ApiResponse<R> = AxiosPromise<ApiData<R>>;

// Definitions for calls are separated depending on arguments
// Which allows for a () => {} function is to be valid
export type CallWithArgs<R, A> = (args: A) => ApiResponse<R>;
export type CallNoArgs<R> = () => ApiResponse<R>;

// Simple conditional type to make defining the calls more uniform
/* eslint-disable-next-line */
export type ApiResource<R, A = void> = A extends Record<string, any>
  ? CallWithArgs<R, A>
  : CallNoArgs<R>;

export const getVines: ApiResource<Vine[]> = () => client.get('vines');

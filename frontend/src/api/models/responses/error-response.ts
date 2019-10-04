import { AxiosResponse } from 'axios';

export type ErrorResponse = { response?: AxiosResponse<{ error: string }> };

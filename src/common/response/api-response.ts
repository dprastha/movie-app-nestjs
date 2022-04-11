import { HttpStatus } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';

export interface IApiResponse<T> {
  success: boolean;
  status_code: number;
  message: string;
  data: T | Pagination<T>;
}

export class ApiResponse {
  static async success<T>(
    data: T | Pagination<T>,
    message: string,
  ): Promise<IApiResponse<T>> {
    return {
      success: true,
      status_code: HttpStatus.OK,
      message: message,
      data: data,
    };
  }
}

export interface IPaginateApiResponse<T> {
  success: boolean;
  status_code: number;
  message: string;
  data: Pagination<T>;
}

export class PaginateApiResponse {
  static async success<T>(
    data: Pagination<T>,
    message: string,
  ): Promise<IPaginateApiResponse<T>> {
    return {
      success: true,
      status_code: HttpStatus.OK,
      message: message,
      data: data,
    };
  }
}

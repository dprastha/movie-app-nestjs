import { HttpStatus } from '@nestjs/common';

export interface IApiResponse<T> {
  success: boolean;
  status_code: number;
  message: string;
  data: T;
}

export class ApiResponse {
  static async success<T>(data: T, message: string): Promise<IApiResponse<T>> {
    return {
      success: true,
      status_code: HttpStatus.OK,
      message: message,
      data: data,
    };
  }
}

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('H');
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const { statusCode } = res;
    const userAgent = req.get('user-agent') || '';

    this.logger.log(
      `${ip} - ${method} - ${statusCode} - ${originalUrl} - ${userAgent}`,
    );

    if (method === 'POST' || method === 'PUT') {
      this.logger.verbose(`requestBody: ${JSON.stringify(req.body)}`);
    }

    next();
  }
}

import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MailService {
  private logger = new Logger('MailService', { timestamp: true });

  constructor(@InjectQueue('mail') private readonly mailQueue: Queue) {}

  async sendRegisteredUserEmail(user: User): Promise<boolean> {
    try {
      await this.mailQueue.add('send-registered-user-email', {
        user,
      });

      this.logger.log(
        `Added email "${user.email}" to send-registered-user-email queue`,
      );

      return true;
    } catch (error) {
      this.logger.error(error);
      return false;
    }
  }
}

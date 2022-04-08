import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { plainToClass } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';

@Processor('mail')
export class MailProcessor {
  private logger = new Logger('MailProcessor', { timestamp: true });

  constructor(private readonly mailerService: MailerService) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(
      `Processing job ${job.id} of type ${job.name}. Data: ${JSON.stringify(
        job.data,
      )}`,
    );
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    this.logger.debug(
      `Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(
        result,
      )}`,
    );
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this.logger.error(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process('send-registered-user-email')
  async sendWelcomeEmail(job: Job<{ user: User }>): Promise<any> {
    this.logger.log(`Sending confirmation email to '${job.data.user.email}'`);

    try {
      const result = await this.mailerService.sendMail({
        template: 'welcome',
        context: {
          ...plainToClass(User, job.data.user),
        },
        subject: `Welcome to Movie App`,
        to: job.data.user.email,
      });

      return result;
    } catch (error) {
      this.logger.error(
        `Failed to send email to '${job.data.user.email}'`,
        error.stack,
      );

      throw error;
    }
  }
}

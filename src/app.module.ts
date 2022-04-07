import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from 'src/common/config/config.schema';
import { MoviesModule } from './movies/movies.module';
import { TagsModule } from './tags/tags.module';
import { StudiosModule } from './studios/studios.module';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filters';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { MovieTagsModule } from './movie_tags/movie_tags.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { MovieSchedulesModule } from './movie-schedules/movie-schedules.module';
import { OrderItemsModule } from './order-items/order-items.module';
import { ScheduleModule } from '@nestjs/schedule';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      validationSchema: configValidationSchema,
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        return dbConfig;
      },
    }),
    MoviesModule,
    TagsModule,
    StudiosModule,
    AuthModule,
    MovieTagsModule,
    OrdersModule,
    UsersModule,
    MovieSchedulesModule,
    OrderItemsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

import { registerAs } from '@nestjs/config';
import { MovieSchedule } from 'src/movie-schedules/entities/movie-schedule.entity';
import { Movie } from 'src/movies/entities/movie.entity';
import { MovieTag } from 'src/movie_tags/entities/movie_tag.entity';
import { OrderItem } from 'src/order-items/entities/order-item.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Studio } from 'src/studios/entities/studio.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';

export default registerAs('database', () => ({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [
    User,
    Tag,
    Movie,
    MovieTag,
    MovieSchedule,
    Order,
    OrderItem,
    Studio,
  ],
}));

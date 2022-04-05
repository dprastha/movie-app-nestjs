import { define } from 'typeorm-seeding';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { RoleEnum } from 'src/common/enums/role.enum';

define(User, () => {
  const salt = bcrypt.genSaltSync();

  const user = new User();
  user.name = 'Admin';
  user.email = 'admin@admin.com';
  user.password = bcrypt.hashSync('Admin123', salt);
  user.avatar = 'https://i.pravatar.cc/300';
  user.role = RoleEnum.Admin;
  user.createdAt = new Date();
  user.updatedAt = new Date();

  return user;
});

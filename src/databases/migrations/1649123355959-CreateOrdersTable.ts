import { PaymentMethodEnum } from 'src/common/enums/paymentMethod.enum';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrdersTable1649123355959 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'total_item_price',
            type: 'double',
            isNullable: false,
          },
          {
            name: 'payment_method',
            type: 'enum',
            enum: [
              PaymentMethodEnum.GOPAY,
              PaymentMethodEnum.BANK_TRANSFER,
              PaymentMethodEnum.CREDIT_CARD,
            ],
            default: PaymentMethodEnum.GOPAY,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders', true, true);
  }
}

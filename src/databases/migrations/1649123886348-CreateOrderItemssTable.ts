import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrderItemssTable1649123886348 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_items',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'order_id',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'movie_schedule_id',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'qty',
            type: 'int',
            length: '11',
          },
          {
            name: 'price',
            type: 'double',
            isNullable: false,
          },
          {
            name: 'sub_total_price',
            type: 'double',
            isNullable: false,
          },
          {
            name: 'snapshots',
            type: 'json',
            isNullable: true,
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
            columnNames: ['order_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'orders',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['movie_schedule_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'movie_schedules',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_items', true, true);
  }
}

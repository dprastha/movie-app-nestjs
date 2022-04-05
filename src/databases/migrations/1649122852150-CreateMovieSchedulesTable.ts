import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMovieSchedulesTable1649122852150
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movie_schedules',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'movie_id',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'studio_id',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'start_time',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'end_time',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'double',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'date',
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
            columnNames: ['movie_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'movies',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: ['studio_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'studios',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movie_schedules', true, true);
  }
}

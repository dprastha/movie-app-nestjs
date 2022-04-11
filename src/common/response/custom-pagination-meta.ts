import { IPaginationMeta } from 'nestjs-typeorm-paginate';

export class CustomPaginationMeta implements IPaginationMeta {
  constructor(
    public readonly item_count: number,
    public readonly total_item: number,
    public readonly items_per_page,
    public readonly total_pages,
    public readonly current_page,
  ) {}
  [s: string]: any;
  itemCount: number;
  totalItems?: number;
  itemsPerPage: number;
  totalPages?: number;
  currentPage: number;
}

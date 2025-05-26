import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeInput, UpdateEmployeeInput} from './types/employee.input';
import { PaginationInput } from './types/pagination.input';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async employeeCreate(data: CreateEmployeeInput) {
    return this.prisma.employee.create({ data });
  }

  async employeeFindAll() {
    return this.prisma.employee.findMany();
  }

  async employeeFindAllWithPagination(pagination: PaginationInput) {
    const { page, pageSize } = pagination;
    const skip = (page - 1) * pageSize;

    const [items, totalItems] = await Promise.all([
      this.prisma.employee.findMany({
        skip,
        take: pageSize,
      }),
      this.prisma.employee.count(),
    ]);

    return {
      items,
      meta: {
        totalItems,
        totalPages: Math.ceil(totalItems / pageSize),
        page,
        pageSize,
      },
    };
  }

  async employeeFindOne(id: number) {
    return this.prisma.employee.findUnique({ where: { id } });
  }

  async employeeUpdate(id: number, data: UpdateEmployeeInput) {
    return this.prisma.employee.update({ where: { id }, data });
  }

  async employeeRemove(id: number) {
    return this.prisma.employee.delete({ where: { id } });
  }
}

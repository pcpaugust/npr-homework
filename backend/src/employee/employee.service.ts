import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeInput, UpdateEmployeeInput} from './types/employee.input';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async employeeCreate(data: CreateEmployeeInput) {
    return this.prisma.employee.create({ data });
  }

  async employeeFindAll() {
    return this.prisma.employee.findMany();
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

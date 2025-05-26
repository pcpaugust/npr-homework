import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { CreateEmployeeInput, UpdateEmployeeInput} from './types/employee.input';

@Resolver('Employee')
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Mutation('EmployeeCreate')
  createEmployee(@Args('data') data: CreateEmployeeInput) {
    return this.employeeService.employeeCreate(data);
  }

  @Query('EmployeeFindAll')
  employees() {
    return this.employeeService.employeeFindAll();
  }

  @Query('EmployeeFindOne')
  employee(@Args('id', { type: () => Int }) id: number) {
    return this.employeeService.employeeFindOne(id);
  }

  @Mutation('EmployeeUpdate')
  updateEmployee(@Args('id', { type: () => Int }) id: number, @Args('data') data: UpdateEmployeeInput) {
    return this.employeeService.employeeUpdate(id, data);
  }

  @Mutation('EmployeeRemove')
  removeEmployee(@Args('id', { type: () => Int }) id: number) {
    return this.employeeService.employeeRemove(id);
  }
}

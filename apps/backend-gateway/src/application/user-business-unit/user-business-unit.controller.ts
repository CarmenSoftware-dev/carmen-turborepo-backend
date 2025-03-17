import { Controller, Get, Param, Req } from '@nestjs/common';
import { UserBusinessUnitService } from './user-business-unit.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/user-business-unit')
@ApiTags('Application - User Business Unit')
export class UserBusinessUnitController {
  constructor(
    private readonly userBusinessUnitService: UserBusinessUnitService,
  ) {}

  @Get()
  async findOne(@Req() req: Request) {
    const userId = req['user']['id'];
    return this.userBusinessUnitService.findOne(userId);
  }

  @Get('default-tenant')
  async setDefaultTenant(@Param('userId') userId: string) {
    return this.userBusinessUnitService.setDefaultTenant(userId);
  }
}

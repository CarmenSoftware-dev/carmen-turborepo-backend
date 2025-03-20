import { Controller } from '@nestjs/common';
import { BusinessUnitService } from './business-unit.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
@Controller('business-unit')
export class BusinessUnitController {
  constructor(private readonly businessUnitService: BusinessUnitService) {}

  @MessagePattern({ cmd: 'business-unit.create', service: 'business-unit' })
  async createBusinessUnit(@Payload() payload: any) {
    // return this.businessUnitService.create(payload);
  }

  @MessagePattern({ cmd: 'business-unit.update', service: 'business-unit' })
  async updateBusinessUnit(@Payload() payload: any) {
    // return this.businessUnitService.update(payload);
  }

  @MessagePattern({ cmd: 'business-unit.delete', service: 'business-unit' })
  async deleteBusinessUnit(@Payload() payload: any) {
    // return this.businessUnitService.delete(payload);
  }

  @MessagePattern({ cmd: 'business-unit.list', service: 'business-unit' })
  async listBusinessUnit(@Payload() payload: any) {
    // return this.businessUnitService.findAll();
  }

  @MessagePattern({ cmd: 'business-unit.get-by-id', service: 'business-unit' })
  async getBusinessUnitById(@Payload() payload: any) {
    // return this.businessUnitService.findOne(payload);
  }
}

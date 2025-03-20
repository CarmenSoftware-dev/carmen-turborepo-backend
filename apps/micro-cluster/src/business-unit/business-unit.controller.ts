import { Controller } from '@nestjs/common';
import { BusinessUnitService } from './business-unit.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IBusinessUnitCreate, IBusinessUnitUpdate } from './interface/business-unit.interface';
@Controller('business-unit')
export class BusinessUnitController {
  constructor(private readonly businessUnitService: BusinessUnitService) {}

  @MessagePattern({ cmd: 'business-unit.create', service: 'business-unit' })
  async createBusinessUnit(@Payload() payload: any) {
    const createBusinessUnit: IBusinessUnitCreate = {
      ...payload.data,
    }
    const user_id = payload.user_id;
    
    return this.businessUnitService.createBusinessUnit(createBusinessUnit, user_id);
  }

  @MessagePattern({ cmd: 'business-unit.update', service: 'business-unit' })
  async updateBusinessUnit(@Payload() payload: any) {
    const updateBusinessUnit: IBusinessUnitUpdate = {
      ...payload.data,
    }
    const user_id = payload.user_id;

    return this.businessUnitService.updateBusinessUnit(updateBusinessUnit, user_id);
  }

  @MessagePattern({ cmd: 'business-unit.delete', service: 'business-unit' })
  async deleteBusinessUnit(@Payload() payload: any) {
    const id = payload.id;
    const user_id = payload.user_id;

    return this.businessUnitService.deleteBusinessUnit(id, user_id);
  }

  @MessagePattern({ cmd: 'business-unit.list', service: 'business-unit' })
  async listBusinessUnit(@Payload() payload: any) {
    return this.businessUnitService.listBusinessUnit();
  }

  @MessagePattern({ cmd: 'business-unit.get-by-id', service: 'business-unit' })
  async getBusinessUnitById(@Payload() payload: any) {
    const id = payload.id;

    return this.businessUnitService.getBusinessUnitById(id);
  }
}

import { Controller } from '@nestjs/common';
import { BusinessUnitService } from './business-unit.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
@Controller('business-unit')
export class BusinessUnitController {
  constructor(private readonly businessUnitService: BusinessUnitService) {}

  @MessagePattern({ cmd: 'find-all', service: 'business-unit' })
  async findAll() {
      // return this.businessUnitService.findAll();
    }

    @MessagePattern({ cmd: 'find-one', service: 'business-unit' })
    async findOne(@Payload() payload: any) {
      // return this.businessUnitService.findOne(payload);
    }

    @MessagePattern({ cmd: 'create', service: 'business-unit' })
    async create(@Payload() payload: any) {
      // return this.businessUnitService.create(payload); 
    }

    @MessagePattern({ cmd: 'update', service: 'business-unit' })
    async update(@Payload() payload: any) {
      // return this.businessUnitService.update(payload);
    } 

    @MessagePattern({ cmd: 'delete', service: 'business-unit' })
    async delete(@Payload() payload: any) {
      // return this.businessUnitService.delete(payload);
    }
}

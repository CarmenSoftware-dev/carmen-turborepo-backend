import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConsoleLogger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  IBusinessUnitCreate,
  IBusinessUnitUpdate,
} from './dto/business-unit.dto';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable()
export class BusinessUnitService {
  private logger = new ConsoleLogger(BusinessUnitService.name);

  constructor(
    @Inject('BUSINESS_UNIT_SERVICE')
    private readonly businessUnitService: ClientProxy,
  ) {}

  async createBusinessUnit(data: IBusinessUnitCreate, user_id: string) {
    const res: Observable<any> = this.businessUnitService.send(
      { cmd: 'business-unit.create', service: 'business-unit' },
      { data: data, user_id: user_id },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: BusinessUnitService.name,
      function: this.createBusinessUnit.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.CREATED) {
      return response.response;
    }

    return response.data;
  }

  async updateBusinessUnit(data: IBusinessUnitUpdate, user_id: string) {
    const res: Observable<any> = this.businessUnitService.send(
      { cmd: 'business-unit.update', service: 'business-unit' },
      { data: data, user_id: user_id },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: BusinessUnitService.name,
      function: this.updateBusinessUnit.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.OK) {
      return response.response;
    }

    return response.data;
  }

  async deleteBusinessUnit(id: string, user_id: string) {
    const res: Observable<any> = this.businessUnitService.send(
      { cmd: 'business-unit.delete', service: 'business-unit' },
      { id: id, user_id: user_id },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: BusinessUnitService.name,
      function: this.deleteBusinessUnit.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.OK) {
      return response.response;
    }

    return response.data;
  }

  async getBusinessUnitList() {
    const res: Observable<any> = this.businessUnitService.send(
      { cmd: 'business-unit.list', service: 'business-unit' },
      { data: null },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: BusinessUnitService.name,
      function: this.getBusinessUnitList.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.OK) {
      return response.response;
    }

    return response.data;
  }

  async getBusinessUnitById(id: string) {
    const res: Observable<any> = this.businessUnitService.send(
      { cmd: 'business-unit.get-by-id', service: 'business-unit' },
      { id: id },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: BusinessUnitService.name,
      function: this.getBusinessUnitById.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.OK) {
      return response.response;
    }

    return response.data;
  }
}

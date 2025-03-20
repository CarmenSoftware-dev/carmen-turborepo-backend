import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BusinessUnitService } from './business-unit.service';
import { ApiTags } from '@nestjs/swagger';
import {
  BusinessUnitCreateDto,
  BusinessUnitUpdateDto,
} from './dto/business-unit.dto';

@Controller('api/config/business-unit')
@ApiTags('Config - Business Unit')
export class BusinessUnitController {
  constructor(private readonly businessUnitService: BusinessUnitService) {}

  private readonly logger = new Logger(BusinessUnitController.name);

  @Get()
  @HttpCode(HttpStatus.OK)
  async getBusinessUnitList() {
    this.logger.debug({
      file: BusinessUnitController.name,
      function: this.getBusinessUnitList.name,
    });
    return this.businessUnitService.getBusinessUnitList();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getBusinessUnitById(@Param('id') id: string) {
    this.logger.debug({
      file: BusinessUnitController.name,
      function: this.getBusinessUnitById.name,
      id: id,
    });
    return this.businessUnitService.getBusinessUnitById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createBusinessUnit(
    @Body() createBusinessUnitDto: BusinessUnitCreateDto,
  ) {
    this.logger.debug({
      file: BusinessUnitController.name,
      function: this.createBusinessUnit.name,
      createBusinessUnitDto: createBusinessUnitDto,
    });
    return this.businessUnitService.createBusinessUnit(createBusinessUnitDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateBusinessUnit(
    @Param('id') id: string,
    @Body() updateBusinessUnitDto: BusinessUnitUpdateDto,
  ) {
    this.logger.debug({
      file: BusinessUnitController.name,
      function: this.updateBusinessUnit.name,
      id: id,
      updateBusinessUnitDto: updateBusinessUnitDto,
    });
    updateBusinessUnitDto.id = id;
    return this.businessUnitService.updateBusinessUnit(updateBusinessUnitDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteBusinessUnit(@Param('id') id: string) {
    this.logger.debug({
      file: BusinessUnitController.name,
      function: this.deleteBusinessUnit.name,
      id: id,
    });
    return this.businessUnitService.deleteBusinessUnit(id);
  }
}

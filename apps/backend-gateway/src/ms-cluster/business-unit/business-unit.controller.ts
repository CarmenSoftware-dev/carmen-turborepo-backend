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
  Req,
  UseGuards,
} from '@nestjs/common';
import { BusinessUnitService } from './business-unit.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  BusinessUnitCreateDto,
  BusinessUnitUpdateDto,
} from './dto/business-unit.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('api/config/business-unit')
@ApiTags('Config - Business Unit')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
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
    @Req() req: Request,
    @Body() createBusinessUnitDto: BusinessUnitCreateDto,
  ) {
    this.logger.debug({
      file: BusinessUnitController.name,
      function: this.createBusinessUnit.name,
      createBusinessUnitDto: createBusinessUnitDto,
    });
    const user_id = req['user'].id;
    return this.businessUnitService.createBusinessUnit(createBusinessUnitDto, user_id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateBusinessUnit(
    @Req() req: Request,
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
    const user_id = req['user'].id;
    return this.businessUnitService.updateBusinessUnit(updateBusinessUnitDto, user_id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteBusinessUnit(@Req() req: Request, @Param('id') id: string) {
    this.logger.debug({
      file: BusinessUnitController.name,
      function: this.deleteBusinessUnit.name,
      id: id,
    });
    const user_id = req['user'].id;
    return this.businessUnitService.deleteBusinessUnit(id, user_id);
  }
}

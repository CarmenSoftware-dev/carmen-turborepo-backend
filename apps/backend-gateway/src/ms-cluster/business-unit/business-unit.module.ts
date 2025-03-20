import { Module } from '@nestjs/common';
import { BusinessUnitService } from './business-unit.service';
import { BusinessUnitController } from './business-unit.controller';

@Module({
  controllers: [BusinessUnitController],
  providers: [BusinessUnitService],
})
export class BusinessUnitModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClusterModule } from './cluster/cluster.module';
import { BusinessUnitModule } from './business-unit/business-unit.module';

@Module({
  imports: [ClusterModule, BusinessUnitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

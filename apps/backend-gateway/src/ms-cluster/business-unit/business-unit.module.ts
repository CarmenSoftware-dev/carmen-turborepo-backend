import { Module } from '@nestjs/common';
import { BusinessUnitService } from './business-unit.service';
import { BusinessUnitController } from './business-unit.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { microClusterConfig } from '@repo/env-config-shared';

const ClusterConfig = new microClusterConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BUSINESS_UNIT_SERVICE',
        transport: Transport.TCP,
        options: { host: ClusterConfig.host, port: ClusterConfig.port },
      },
    ]),
  ],
  controllers: [BusinessUnitController],
  providers: [BusinessUnitService],
})
export class BusinessUnitModule {}

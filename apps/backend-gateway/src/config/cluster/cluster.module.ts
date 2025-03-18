import { Module } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { ClusterController } from './cluster.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { microClusterConfig } from '@repo/env-config-shared';

const ClusterConfig = new microClusterConfig();

@Module({
  imports: [ClientsModule.register([
    {
      name: 'CLUSTER_SERVICE',
      transport: Transport.TCP,
      options: { host: ClusterConfig.host, port: ClusterConfig.port },
    }
  ])],
  controllers: [ClusterController],
  providers: [ClusterService],
})
export class ClusterModule {}

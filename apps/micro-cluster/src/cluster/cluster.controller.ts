import { Controller } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}

  @MessagePattern({ cmd: 'cluster.create', service: 'cluster' })
  async createCluster(data: any) {
    return this.clusterService.createCluster(data);
  }

  @MessagePattern({ cmd: 'cluster.update', service: 'cluster' })
  async updateCluster(data: any) {
    return this.clusterService.updateCluster(data);
  }

  @MessagePattern({ cmd: 'cluster.delete', service: 'cluster' })
  async deleteCluster(data: any) {
    return this.clusterService.deleteCluster(data);
  }

  @MessagePattern({ cmd: 'cluster.list', service: 'cluster' })
  async listCluster(data: any) {
    return this.clusterService.listCluster(data);
  }

  @MessagePattern({ cmd: 'cluster.get-by-id', service: 'cluster' })
  async getClusterById(data: any) {
    return this.clusterService.getClusterById(data);
  }

}

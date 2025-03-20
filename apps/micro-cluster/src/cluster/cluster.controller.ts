import { Controller } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IClusterCreate, IClusterUpdate } from './interface/cluster.interface';

@Controller()
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}

  @MessagePattern({ cmd: 'cluster.create', service: 'cluster' })
  async createCluster(@Payload() payload: any) {
    const createCluster: IClusterCreate = {
      ...payload.data,
    };

    const user_id = payload.user_id;

    return this.clusterService.createCluster(createCluster, user_id);
  }

  @MessagePattern({ cmd: 'cluster.update', service: 'cluster' })
  async updateCluster(@Payload() payload: any) {
    const updateCluster: IClusterUpdate = {
      ...payload.data,
    };

    const user_id = payload.user_id;

    return this.clusterService.updateCluster(updateCluster, user_id);
  }

  @MessagePattern({ cmd: 'cluster.delete', service: 'cluster' })
  async deleteCluster(@Payload() payload: any) {
    const id = payload.id;
    const user_id = payload.user_id;

    return this.clusterService.deleteCluster(id, user_id);
  }

  @MessagePattern({ cmd: 'cluster.list', service: 'cluster' })
  async listCluster(@Payload() payload: any) {
    return this.clusterService.listCluster();
  }

  @MessagePattern({ cmd: 'cluster.get-by-id', service: 'cluster' })
  async getClusterById(@Payload() payload: any) {
    const id = payload.id;

    return this.clusterService.getClusterById(id);
  }
}

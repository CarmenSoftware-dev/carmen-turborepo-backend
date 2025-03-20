import { ConsoleLogger, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { IClusterCreate, IClusterUpdate } from './dto/cluster.dto';
@Injectable()
export class ClusterService {
  private logger = new ConsoleLogger(ClusterService.name);

  constructor(
    @Inject('CLUSTER_SERVICE') private readonly clusterService: ClientProxy,
  ) {}

  async createCluster(data: IClusterCreate, user_id: string) {
    const res: Observable<any> = this.clusterService.send(
      { cmd: 'cluster.create', service: 'cluster' },
      { data: data, user_id: user_id },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: ClusterService.name,
      function: this.createCluster.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.CREATED) {
      return response.response;
    }

    return response.data;
  }

  async updateCluster(data: IClusterUpdate, user_id: string) {
    const res: Observable<any> = this.clusterService.send(
      { cmd: 'cluster.update', service: 'cluster' },
      { data: data, user_id: user_id },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: ClusterService.name,
      function: this.updateCluster.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.OK) {
      return response.response;
    }

    return response.data;
  }

  async deleteCluster(id: string, user_id: string) {
    const res: Observable<any> = this.clusterService.send(
      { cmd: 'cluster.delete', service: 'cluster' },
      { id: id, user_id: user_id },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: ClusterService.name,
      function: this.deleteCluster.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.OK) {
      return response.response;
    }

    return response.data;
  }

  async getlistCluster() {
    const res: Observable<any> = this.clusterService.send(
      { cmd: 'cluster.list', service: 'cluster' },
      { data: null },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: ClusterService.name,
      function: this.getlistCluster.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.OK) {
      return response.response;
    }

    return response.data;
  }

  async getClusterById(id: string) {
    const res: Observable<any> = this.clusterService.send(
      { cmd: 'cluster.get-by-id', service: 'cluster' },
      { id: id },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: ClusterService.name,
      function: this.getClusterById.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.OK) {
      return response.response;
    }

    return response.data;
  }
}

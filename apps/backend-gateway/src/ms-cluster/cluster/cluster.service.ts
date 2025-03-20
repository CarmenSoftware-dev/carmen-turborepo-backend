import {
  ConsoleLogger,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { IClusterCreate, IClusterUpdate } from './dto/cluster.dto';
@Injectable()
export class ClusterService {
  private logger = new ConsoleLogger(ClusterService.name);

  constructor(
    @Inject('CLUSTER_SERVICE') private readonly clusterService: ClientProxy,
  ) {}

  async createCluster(data: IClusterCreate) {
    const res: Observable<any> = this.clusterService.send(
      { cmd: 'cluster.create', service: 'cluster' },
      { data: data },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: ClusterService.name,
      function: this.createCluster.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.OK) {
      throw new HttpException(response.response, response.response.status);
    }

    return response.data;
  }

  async updateCluster(data: IClusterUpdate) {
    const res: Observable<any> = this.clusterService.send(
      { cmd: 'cluster.update', service: 'cluster' },
      { data: data },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: ClusterService.name,
      function: this.updateCluster.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.OK) {
      throw new HttpException(response.response, response.response.status);
    }

    return response.data;
  }

  async deleteCluster(id: string) {
    const res: Observable<any> = this.clusterService.send(
      { cmd: 'cluster.delete', service: 'cluster' },
      { data: id },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: ClusterService.name,
      function: this.deleteCluster.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.OK) {
      throw new HttpException(response.response, response.response.status);
    }

    return response.data;
  }

  async listCluster() {
    const res: Observable<any> = this.clusterService.send(
      { cmd: 'cluster.list', service: 'cluster' },
      { data: null },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: ClusterService.name,
      function: this.listCluster.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.OK) {
      throw new HttpException(response.response, response.response.status);
    }

    return response.data;
  }

  async getClusterById(id: string) {
    const res: Observable<any> = this.clusterService.send(
      { cmd: 'cluster.get-by-id', service: 'cluster' },
      { data: id },
    );

    const response = await firstValueFrom(res);

    this.logger.log({
      file: ClusterService.name,
      function: this.getClusterById.name,
      res: response,
    });

    if (response.response.status !== HttpStatus.OK) {
      throw new HttpException(response.response, response.response.status);
    }

    return response.data;
  }
}

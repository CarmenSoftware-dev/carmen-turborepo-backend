import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ClusterService {
    private logger = new ConsoleLogger(ClusterService.name);

    constructor(
        @Inject('CLUSTER_SERVICE') private readonly clusterService: ClientProxy,
    ) {}
    
    
}

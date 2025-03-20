import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { ApiTags } from '@nestjs/swagger';
import { ClusterCreateDto, ClusterUpdateDto } from './dto/cluster.dto';

@Controller('api/config/cluster')
@ApiTags('Config - Cluster')
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}

  private readonly logger = new Logger(ClusterController.name);

  @Get()
  @HttpCode(HttpStatus.OK)
  async getListCluster() {
    this.logger.debug({
      file: ClusterController.name,
      function: this.getListCluster.name,
    });
    return this.clusterService.listCluster();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getClusterById(@Param('id') id: string) {
    this.logger.debug({
      file: ClusterController.name,
      function: this.getClusterById.name,
      id: id,
    });
    return this.clusterService.getClusterById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCluster(@Body() createClusterDto: ClusterCreateDto) {
    this.logger.debug({
      file: ClusterController.name,
      function: this.createCluster.name,
      createClusterDto: createClusterDto,
    });
    return this.clusterService.createCluster(createClusterDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateCluster(@Param('id') id: string, @Body() updateClusterDto: ClusterUpdateDto) {
    this.logger.debug({
      file: ClusterController.name,
      function: this.updateCluster.name,
      id: id,
      updateClusterDto: updateClusterDto,
    });

    updateClusterDto.id = id;

    return this.clusterService.updateCluster(updateClusterDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteCluster(@Param('id') id: string) {
    this.logger.debug({
      file: ClusterController.name,
      function: this.deleteCluster.name,
      id: id,
    });
    return this.clusterService.deleteCluster(id);
  }
}

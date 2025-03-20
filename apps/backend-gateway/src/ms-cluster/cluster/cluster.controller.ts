import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, Req, UseGuards  } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ClusterCreateDto, ClusterUpdateDto } from './dto/cluster.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('api/config/cluster')
@ApiTags('Config - Cluster')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
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
    return this.clusterService.getlistCluster();
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
  async createCluster(@Req() req: Request, @Body() createClusterDto: ClusterCreateDto) {
    this.logger.debug({
      file: ClusterController.name,
      function: this.createCluster.name,
      createClusterDto: createClusterDto,
    });

    const user_id = req['user'].id;

    return this.clusterService.createCluster(createClusterDto, user_id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateCluster(@Req() req: Request, @Param('id') id: string, @Body() updateClusterDto: ClusterUpdateDto) {
    this.logger.debug({
      file: ClusterController.name,
      function: this.updateCluster.name,
      id: id,
      updateClusterDto: updateClusterDto,
    });

    updateClusterDto.id = id;
    const user_id = req['user'].id;

    return this.clusterService.updateCluster(updateClusterDto, user_id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteCluster(@Req() req: Request,@Param('id') id: string) {
    this.logger.debug({
      file: ClusterController.name,
      function: this.deleteCluster.name,
      id: id,
    });

    const user_id = req['user'].id;
    return this.clusterService.deleteCluster(id, user_id);
  }
}

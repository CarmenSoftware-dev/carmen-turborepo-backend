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
  async findAll() {
    this.logger.debug({
      file: ClusterController.name,
      function: this.findAll.name,
    });
    // return this.clusterService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    this.logger.debug({
      file: ClusterController.name,
      function: this.findOne.name,
      id: id,
    });
    // return this.clusterService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createClusterDto: ClusterCreateDto) {
    this.logger.debug({
      file: ClusterController.name,
      function: this.create.name,
      createClusterDto: createClusterDto,
    });
    // return this.clusterService.create(createClusterDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateClusterDto: ClusterUpdateDto) {
    this.logger.debug({
      file: ClusterController.name,
      function: this.update.name,
      id: id,
      updateClusterDto: updateClusterDto,
    });
    // return this.clusterService.update(id, updateClusterDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    this.logger.debug({
      file: ClusterController.name,
      function: this.remove.name,
      id: id,
    });
    // return this.clusterService.remove(id);
  }
}

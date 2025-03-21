import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaClient_SYSTEM } from '@repo/prisma-shared-schema-platform';
import { SupabaseClient } from '@repo/supabase-shared';
import { PrismaClient_TENANT } from '@repo/prisma-shared-schema-tenant';
import { IClusterCreate, IClusterUpdate } from './interface/cluster.interface';

@Injectable()
export class ClusterService {
  constructor(
    @Inject('PRISMA_SYSTEM')
    private readonly prismaSystem: typeof PrismaClient_SYSTEM,
    @Inject('SUPABASE') private readonly supabase: typeof SupabaseClient,
    @Inject('PRISMA_TENANT')
    private readonly prismaTenant: typeof PrismaClient_TENANT,
  ) {}

  async createCluster(data: IClusterCreate, user_id: string) {
    const findCluster = await this.prismaSystem.tb_cluster.findFirst({
      where: {
        code: data.code,
        name: data.name,
      },
    });

    if (findCluster) {
      return {
        response: {
          status: HttpStatus.CONFLICT,
          message: 'Cluster already exists',
        },
      };
    }

    const createCluster = await this.prismaSystem.tb_cluster.create({
      data: {
        ...data,
        created_by_id: user_id,
      },
    });

    return {
      data: { id: createCluster.id },
      response: {
        status: HttpStatus.CREATED,
        message: 'Cluster created successfully',
      },
    };
  }

  async updateCluster(data: IClusterUpdate, user_id: string) {
    const cluster = await this.prismaSystem.tb_cluster.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!cluster) {
      return {
        response: {
          status: HttpStatus.NO_CONTENT,
          message: 'Cluster not found',
        },
      };
    }

    const findCluster = await this.prismaSystem.tb_cluster.findFirst({
      where: {
        code: data.code ?? cluster.code,
        name: data.name ?? cluster.name,
        id: {
          not: data.id,
        },
      },
    });

    if (findCluster) {
      return {
        response: {
          status: HttpStatus.CONFLICT,
          message: 'Cluster already exists',
        },
      };
    }

    await this.prismaSystem.tb_cluster.update({
      where: { id: data.id },
      data: {
        ...data,
        updated_at: new Date(),
        updated_by_id: user_id,
      },
    });

    return {
      data: { id: data.id },
      response: {
        status: HttpStatus.OK,
        message: 'Cluster updated successfully',
      },
    };
  }

  async deleteCluster(id: string, user_id: string) {
    const cluster = await this.prismaSystem.tb_cluster.findUnique({
      where: { id: id },
    });

    if (!cluster) {
      return {
        response: {
          status: HttpStatus.NO_CONTENT,
          message: 'Cluster not found',
        },
      };
    }

    await this.prismaSystem.tb_cluster.update({
      where: { id: id },
      data: {
        is_active: false,
        updated_at: new Date(),
        updated_by_id: user_id,
      },
    });

    return {
      response: {
        status: HttpStatus.OK,
        message: 'Cluster deleted successfully',
      },
    };
  }

  async listCluster() {
    const clusters = await this.prismaSystem.tb_cluster.findMany();

    return {
      data: clusters,
      response: {
        status: HttpStatus.OK,
        message: 'Clusters retrieved successfully',
      },
    };
  }

  async getClusterById(id: string) {
    const cluster = await this.prismaSystem.tb_cluster.findUnique({
      where: { id },  
    });

    if (!cluster) {
      return {
        response: {
          status: HttpStatus.NO_CONTENT,
          message: 'Cluster not found',
        },
      };
    }

    return {
      data: cluster,
      response: {
        status: HttpStatus.OK,
        message: 'Cluster retrieved successfully',
      },
    };
  }
}

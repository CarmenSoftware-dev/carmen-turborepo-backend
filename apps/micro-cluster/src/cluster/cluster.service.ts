import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient_SYSTEM } from '@repo/prisma-shared-schema-platform';
import { SupabaseClient } from '@repo/supabase-shared';
import { PrismaClient_TENANT } from '@repo/prisma-shared-schema-tenant';

@Injectable()
export class ClusterService {
  constructor(
    @Inject('PRISMA_SYSTEM') private readonly prismaSystem: typeof PrismaClient_SYSTEM,
    @Inject('SUPABASE') private readonly supabase: typeof SupabaseClient,
    @Inject('PRISMA_TENANT') private readonly prismaTenant: typeof PrismaClient_TENANT,
  ) {}

  async createCluster(data: any) {
    return this.prismaSystem.tb_cluster.create({
      data,
    });
  }

  async updateCluster(data: any) {
    return this.prismaSystem.tb_cluster.update({
      where: { id: data.id },
      data,
    });
  }

  async deleteCluster(data: any) {
    return this.prismaSystem.tb_cluster.delete({
      where: { id: data.id },
    });
  }

  async listCluster(data: any) {
    return this.prismaSystem.tb_cluster.findMany({
      where: data,
    });
  }

  async getClusterById(data: any) {
    return this.prismaSystem.tb_cluster.findUnique({
      where: { id: data.id },
    });
  }

}

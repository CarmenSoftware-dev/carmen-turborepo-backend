import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaClient_SYSTEM } from '@repo/prisma-shared-schema-platform/src';
import { PrismaClient_TENANT } from '@repo/prisma-shared-schema-tenant/src/client';
import { SupabaseClient } from '@repo/supabase-shared/dist';
import {
  IBusinessUnitCreate,
  IBusinessUnitUpdate,
} from './interface/business-unit.interface';

@Injectable()
export class BusinessUnitService {
  constructor(
    @Inject('PRISMA_SYSTEM')
    private readonly prismaSystem: typeof PrismaClient_SYSTEM,
    @Inject('SUPABASE') private readonly supabase: typeof SupabaseClient,
    @Inject('PRISMA_TENANT')
    private readonly prismaTenant: typeof PrismaClient_TENANT,
  ) {}

  async createBusinessUnit(data: IBusinessUnitCreate, user_id: string) {
    const cluster = await this.prismaSystem.tb_cluster.findUnique({
      where: {
        id: data.cluster_id,
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

    const findBusinessUnit = await this.prismaSystem.tb_business_unit.findFirst(
      {
        where: {
          cluster_id: data.cluster_id,
          code: data.code,
          name: data.name,
        },
      },
    );

    if (findBusinessUnit) {
      return {
        response: {
          status: HttpStatus.CONFLICT,
          message: 'Business unit already exists',
        },
      };
    }

    const createBusinessUnit = await this.prismaSystem.tb_business_unit.create({
      data: {
        ...data,
        created_by_id: user_id,
      },
    });

    return {
      data: { id: createBusinessUnit.id },
      response: {
        status: HttpStatus.CREATED,
        message: 'Business unit created successfully',
      },
    };
  }

  async updateBusinessUnit(data: IBusinessUnitUpdate, user_id: string) {
    const businessUnit = await this.prismaSystem.tb_business_unit.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!businessUnit) {
      return {
        response: {
          status: HttpStatus.NOT_FOUND,
          message: 'Business unit not found',
        },
      };
    }

    if (data.cluster_id) {
      const cluster = await this.prismaSystem.tb_cluster.findUnique({
        where: {
          id: data.cluster_id,
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
    }

    const findBusinessUnit = await this.prismaSystem.tb_business_unit.findFirst(
      {
        where: {
          cluster_id: data.cluster_id ?? businessUnit.cluster_id,
          code: data.code ?? businessUnit.code,
          name: data.name ?? businessUnit.name,
          id: {
            not: data.id,
          },
        },
      },
    );

    if (findBusinessUnit) {
      return {
        response: {
          status: HttpStatus.CONFLICT,
          message: 'Business unit already exists',
        },
      };
    }
    await this.prismaSystem.tb_business_unit.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
        updated_by_id: user_id,
        updated_at: new Date(),
      },
    });

    return {
      data: { id: data.id },
      response: {
        status: HttpStatus.OK,
        message: 'Business unit updated successfully',
      },
    };
  }

  async deleteBusinessUnit(id: string, user_id: string) {
    const businessUnit = await this.prismaSystem.tb_business_unit.findUnique({
      where: {
        id,
      },
    });

    if (!businessUnit) {
      return {
        response: {
          status: HttpStatus.NO_CONTENT,
          message: 'Business unit not found',
        },
      };
    }

    await this.prismaSystem.tb_business_unit.update({
      where: { id },
      data: {
        is_active: false,
        updated_by_id: user_id,
        updated_at: new Date(),
      },
    });

    return {
      response: {
        status: HttpStatus.OK,
        message: 'Business unit deleted successfully',
      },
    };
  }

  async listBusinessUnit() {
    const businessUnits = await this.prismaSystem.tb_business_unit.findMany();

    return {
      data: businessUnits,
      response: {
        status: HttpStatus.OK,
        message: 'Business units retrieved successfully',
      },
    };
  }

  async getBusinessUnitById(id: string) {
    const businessUnit = await this.prismaSystem.tb_business_unit.findUnique({
      where: {
        id,
      },
    });

    if (!businessUnit) {
      return {
        response: {
          status: HttpStatus.NO_CONTENT,
          message: 'Business unit not found',
        },
      };
    }

    return {
      data: businessUnit,
      response: {
        status: HttpStatus.OK,
        message: 'Business unit retrieved successfully',
      },
    };
  }
}

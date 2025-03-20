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

  async createBusinessUnit(data: IBusinessUnitCreate) {
    const findBusinessUnit =
      await this.prismaSystem.tb_business_unit.findUnique({
        where: {
          cluster_id_code: {
            cluster_id: data.cluster_id,
            code: data.code,
          },
        },
      });

    if (findBusinessUnit) {
      return {
        response: {
          status: HttpStatus.CONFLICT,
          message: 'Business unit already exists',
        },
      };
    }

    const createBusinessUnit = await this.prismaSystem.tb_business_unit.create({
      data,
    });

    return {
      data: { id: createBusinessUnit.id },
      response: {
        status: HttpStatus.CREATED,
        message: 'Business unit created successfully',
      },
    };
  }

  async updateBusinessUnit(data: IBusinessUnitUpdate) {
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

    await this.prismaSystem.tb_business_unit.update({
      where: {
        id: data.id,
      },
      data,
    });

    return {
      data: { id: data.id },
      response: {
        status: HttpStatus.OK,
        message: 'Business unit updated successfully',
      },
    };
  }

  async deleteBusinessUnit(id: string) {
    const businessUnit = await this.prismaSystem.tb_business_unit.findUnique({
      where: {
        id,
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

    await this.prismaSystem.tb_business_unit.delete({
      where: { id },
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
          status: HttpStatus.NOT_FOUND,
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

import { Module } from '@nestjs/common';
import { BusinessUnitService } from './business-unit.service';
import { BusinessUnitController } from './business-unit.controller';
import { PrismaClient_SYSTEM } from '@repo/prisma-shared-schema-platform';
import { PrismaClient_TENANT } from '@repo/prisma-shared-schema-tenant';
import { SupabaseClient } from '@repo/supabase-shared';

@Module({
  controllers: [BusinessUnitController],
  providers: [BusinessUnitService,
    {
      provide: 'PRISMA_SYSTEM', 
      useValue: PrismaClient_SYSTEM,
    },
    {
      provide: 'SUPABASE',
      useValue: SupabaseClient,
    },
    {
      provide: 'PRISMA_TENANT',
      useValue: PrismaClient_TENANT,
    },
  ],
  exports: [BusinessUnitService],
})
export class BusinessUnitModule {}

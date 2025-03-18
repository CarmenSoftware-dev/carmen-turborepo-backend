import { Module } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { ClusterController } from './cluster.controller';
import { PrismaClient_SYSTEM } from '@repo/prisma-shared-schema-platform';
import { SupabaseClient } from '@repo/supabase-shared';
import { PrismaClient_TENANT } from '@repo/prisma-shared-schema-tenant';

@Module({
  providers: [
    ClusterService,
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
  controllers: [ClusterController],
})
export class ClusterModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';
import { CreditNoteModule } from './application/credit-note/credit-note.module';
import { CurrenciesModule } from './config/currencies/currencies.module';
import { DeliveryPointModule } from './config/delivery-point/delivery-point.module';
import { DepartmentsModule } from './config/departments/departments.module';
import { LocationProductModule } from './config/location-product/location-product.module';
import { LocationsModule } from './config/locations/locations.module';
import { ExchangeRateModule } from './config/exchange-rate/exchange-rate.module';
import { GoodReceiveNoteModule } from './config/good-receive-note/good-receive-note.module';
import { ProductCategoryModule } from './config/product-category/product-category.module';
import { ProductItemGroupModule } from './config/product-item-group/product-item-group.module';
import { ProductLocationModule } from './config/product-location/product-location.module';
import { ProductSubCategoryModule } from './config/product-sub-category/product-sub-category.module';
import { ProductsModule } from './config/products/products.module';
import { PurchaseOrderModule } from './application/purchase-order/purchase-order.module';
import { PurchaseRequestModule } from './application/purchase-request/purchase-request.module';
import { RunningCodeModule } from './config/running-code/running-code.module';
import { StoreRequisitionModule } from './config/store-requisition/store-requisition.module';
import { UnitsModule } from './config/units/units.module';
import { UserBusinessUnitModule } from './application/user-business-unit/user-business-unit.module';
import { UserLocationModule } from './config/user-location/user-location.module';
import { VendorsModule } from './config/vendors/vendors.module';
import { WorkflowsModule } from './config/workflows/workflows.module';
import { DepartmentUserModule } from './config/department-user/department-user.module';
import { UnitCommentModule } from './application/unit-comment/unit-comment.module';
import { LocationsUserModule } from './config/locations-user/locations-user.module';
import { VendorProductModule } from './application/vendor-product/vendor-product.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { microAuthenConfig, microClusterConfig } from '@repo/env-config-shared';
import { ClusterModule } from './ms-cluster/cluster/cluster.module';
import { BusinessUnitModule } from './ms-cluster/business-unit/business-unit.module';
import { ConfigModule } from '@nestjs/config';
const AuthenConfig = new microAuthenConfig();
const ClusterConfig = new microClusterConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: { host: AuthenConfig.host, port: AuthenConfig.port },
      },
      {
        name: 'CLUSTER_SERVICE',
        transport: Transport.TCP,
        options: { host: ClusterConfig.host, port: ClusterConfig.port },
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true, // ทำให้ ConfigModule ใช้ได้ทั่วทั้งแอป
    }),
    AuthModule,
    DepartmentUserModule,
    UnitCommentModule,
    LocationsUserModule,
    VendorProductModule,
    CreditNoteModule,
    CurrenciesModule,
    DeliveryPointModule,
    DepartmentsModule,
    ExchangeRateModule,
    GoodReceiveNoteModule,
    LocationProductModule,
    LocationsModule,
    ProductCategoryModule,
    ProductItemGroupModule,
    ProductLocationModule,
    ProductSubCategoryModule,
    ProductsModule,
    PurchaseOrderModule,
    PurchaseRequestModule,
    RunningCodeModule,
    StoreRequisitionModule,
    UnitsModule,
    UserBusinessUnitModule,
    UserLocationModule,
    VendorsModule,
    WorkflowsModule,
    ClusterModule,
    BusinessUnitModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}

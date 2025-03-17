import { Controller } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/purchase-order')
@ApiTags('Application - Purchase Order')
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}
}

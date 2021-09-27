import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from './products.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: productSchema }]), // importing mongoose module, so we can make use of mongoose in this module & provide models which can be used across module
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductsModule {}

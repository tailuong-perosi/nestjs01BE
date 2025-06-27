import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { CreateProductService } from './services/create.service';
import { Products, ProductsSchema } from './schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ProductsRepository } from './repositories/product.repository';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Products.name, schema: ProductsSchema }]), CloudinaryModule
  ],
  controllers: [ProductsController],
  providers: [ProductsRepository,CreateProductService],
})
export class ProductsModule {}

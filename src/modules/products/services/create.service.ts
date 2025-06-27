import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { IProductCreateResponse } from '../interfaces/product.interface';
import { BaseProductService } from './base.service';
@Injectable()
export class CreateProductService extends BaseProductService {
  async create(
    createProductDto: CreateProductDto,
  ): Promise<IProductCreateResponse> {
    const result = await this.productsRepository.insert({
      update: createProductDto,
    });
    return {
      message: 'Product created successfully',
      productId: result._id.toString(),
    };
  }
}

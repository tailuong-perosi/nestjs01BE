import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProductsRepository } from '../repositories/product.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from '../schemas/product.schema';
@Injectable()
export class BaseProductService {
  constructor(
    protected readonly productsRepository: ProductsRepository,
    protected readonly cloudinaryService: CloudinaryService,
  ) {}
}

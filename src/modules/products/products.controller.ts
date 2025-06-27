import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductService } from './services/create.service';
import { Public } from 'src/decorator/customize';
import { IProductCreateResponse } from './interfaces/product.interface';

@Controller('Products')
export class ProductsController {
  constructor(private readonly createProductService:CreateProductService ) {}

  @Post()
  @Public()
  create(@Body() createProductDto: CreateProductDto):Promise<IProductCreateResponse> {
    return this.createProductService.create(createProductDto);
  }

  // @Get()
  // findAll() {
  //   return this.productsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
}

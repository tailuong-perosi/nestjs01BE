import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/base/base.repository";
import { Products, ProductsDocument } from "../schemas/product.schema";

export class ProductsRepository extends BaseRepository<ProductsDocument> {
  constructor(
    @InjectModel(Products.name)
    private readonly ProductsModel: Model<ProductsDocument>,
  ) {
    super(ProductsModel);
  }
}

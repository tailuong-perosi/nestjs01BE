import { Prop, SchemaFactory,Schema } from '@nestjs/mongoose';

import { Types, HydratedDocument } from 'mongoose';

export type ProductsDocument = HydratedDocument<Products>;
export class UrlItem {
  @Prop({ type: String })
  url: string;

  @Prop({ type: Number })
  type: number;  //image: 1 | video: 2 
}
@Schema({  timestamps: true,versionKey: false }) 
export class Products {
  @Prop({ type: String })
  name: string;

  @Prop({ type: [UrlItem], default: [] })
  urls: UrlItem[];

  @Prop({ type: String, default: '' })
  description: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Boolean, default: false })
  isDelete: boolean;

  @Prop({ type: Number, default: 1 })
  pageSite: number;

  @Prop({ type: Number, default: 4 })
  rating: number;

  @Prop({ type: Number, default: 1 })
  status: number;

  @Prop({ type: Number, default: 1 })
  reviews: number;

  @Prop({ type: [String], default: [] })
  overviews: string[];

  @Prop({ type: String, default: '' })
  tripDuration: string;

  @Prop({ type: [String], default: [] })
  tag: string[];

  @Prop({ type: String, default: '' })
  location: string;


}

export const ProductsSchema = SchemaFactory.createForClass(Products);

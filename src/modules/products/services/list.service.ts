import { BaseProductService } from "./base.service";


export class ListProductService extends BaseProductService{

    async findAll(){
        const result = await this.productsRepository.
    }

}
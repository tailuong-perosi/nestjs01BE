import { FilterQuery } from "mongoose";
import { IListUserResponse } from "../interfaces/user.interface";
import { BaseUserService } from "./base.service";
import aqp from "api-query-params";


export class ListUserService extends BaseUserService{

    async findAll(query: any): Promise<IListUserResponse>{
        const {filter, limit, page} = query
        const result = await this.userModel.find(filter).limit(limit).select('-password').exec()

        const list = result.map((user) => user)
        const totalPage =  Math.ceil(list.length / limit)
        return {
            list: list,
            page: page,
            totalPage: totalPage,
            limit: limit,
            total: list.length
        }
    }
}
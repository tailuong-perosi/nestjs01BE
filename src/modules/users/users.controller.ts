import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ICreateUserResponse, IListUserResponse, IUserResponse } from './interfaces/user.interface';
import { CreateUserService } from './services/create.service';
import { ListUserService } from './services/list.service';

@Controller('Users')
export class UsersController {
  constructor(private readonly createUserService: CreateUserService, 
    private readonly listUserService: ListUserService,
  ) {}

  @Post('')
  @UseInterceptors(FilesInterceptor('urls'))
  async uploadProduct(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateUserDto,
  ):Promise<ICreateUserResponse> {
    return this.createUserService.create(body, files);
  }


  @Get('')
  async findAll(
    @Query() query: string,
  ): Promise<IListUserResponse>{
    return this.listUserService.findAll(query)
  }
}

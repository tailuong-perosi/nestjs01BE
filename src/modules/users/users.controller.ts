import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, Query, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ICreateUserResponse, IListUserResponse, IUserResponse } from './interfaces/user.interface';
import { CreateUserService } from './services/create.service';
import { ListUserService } from './services/list.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserService } from './services/update.service';
import { DeleteUserService } from './services/delete.service';
import { DetailUserService } from './services/detail.service';

@Controller('Users')
export class UsersController {
  constructor(private readonly createUserService: CreateUserService, 
    private readonly listUserService: ListUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
    private readonly detailUserService: DetailUserService
  ) {}

  @Post('')
  @UseInterceptors(FilesInterceptor('urls'))
  async create(
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

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ):Promise<IUserResponse>{
    return this.detailUserService.findByID(id)
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('urls'))
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<ICreateUserResponse>{
    return this.updateUserService.update(id, body)
  }
  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<ICreateUserResponse>{
    return this.deleteUserService.remove(id)
  }
}


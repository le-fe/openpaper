import { Controller, Get, Query } from '@nestjs/common';
import { IType } from '../interfaces/IType';
import { Type } from './type.model';
import { TypeService } from './type.service';

@Controller('type')
export class TypeController {
  constructor(private typeService: TypeService) {}

  @Get()
  async findAll(): Promise<IType[]> {
    return await this.typeService.findAll({});
  }
}

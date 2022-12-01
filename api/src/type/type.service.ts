import { Inject, Injectable } from '@nestjs/common';
import { IType } from '../interfaces/IType';
import { Type } from './type.model';
import { TYPE_REPOSITORY } from '../database/constants';

@Injectable()
export class TypeService {
  constructor(
    @Inject(TYPE_REPOSITORY) private readonly typeRepository: typeof Type,
  ) {}
  private readonly types: IType[] = [];

  async findAll(queries: object): Promise<IType[]> {
    return await this.typeRepository.findAll<Type>({ ...queries });
  }
}

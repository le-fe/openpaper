import { Injectable, Inject } from '@nestjs/common';
import { COUNTRY_REPOSITORY } from '../database/constants';
import { ICountry } from '../interfaces/ICountry';
import { Country } from './country.model';

@Injectable()
export class CountryService {
  constructor(
    @Inject(COUNTRY_REPOSITORY)
    private readonly countryRepository: typeof Country,
  ) {}

  async findAll(): Promise<Country[]> {
    return await this.countryRepository.findAll({ limit: 10 });
  }
}

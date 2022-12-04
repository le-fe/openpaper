import { Controller, Get } from '@nestjs/common';
import { Country } from './country.model';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Get()
  async findAll(): Promise<Country[]> {
    return await this.countryService.findAll();
  }
}

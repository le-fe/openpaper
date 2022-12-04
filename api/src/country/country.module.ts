import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { countriesProviders } from './country.provider';

@Module({
  providers: [CountryService, ...countriesProviders],
  controllers: [CountryController],
})
export class CountryModule {}

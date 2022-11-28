import { Media } from './media.model';
import { MEDIA_REPOSITORY } from '../database/constants';

export const mediaProviders = [{
    provide: MEDIA_REPOSITORY,
    useValue: Media,
}];
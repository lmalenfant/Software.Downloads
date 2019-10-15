import { Asset } from './asset.model';

export class Version {
    tag_name: string;
    name: string;
    published_at: string;
    assets: Array<Asset>;
  }
  
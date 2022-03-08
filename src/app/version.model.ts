import { Asset } from './asset.model';

export class Version {
    public tag_name: string = "";
    public name: string = "";
    public published_at: string = "01/01/2020";
    public assets: Array<Asset> = [];
  }
  
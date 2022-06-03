export class OpenseaResponse {
    assets: Asset[];
    next: string;
  }


export class Asset {
    animation_original_url: string;
    image_original_url: string;
    name: string;
    creator: {
        user: {username: string}, 
        address: string
    }
    

}
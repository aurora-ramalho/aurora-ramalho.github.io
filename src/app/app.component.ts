import { Component, OnInit, DoCheck } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { NFT } from './nft.model'
import { ApiService } from './api.service' 
import { Asset } from './opensea.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'myApp';

  // public imageLoading = true
  // public imageLoadingUrl = "src/assets/imagens/loading.svg"
  public imageLoadingUrl = '/assets/imagens/loading.svg'

  public assets: NFT[] = []

  constructor(private http: HttpClient,
              private api: ApiService) {}

  async ngOnInit() {

    // await this.getNFTs()

    const num_col = 4

    // get opensea nfts
    this.getOpensea(num_col)
    // this.paginated_fetch(this.api.params, [])
    // get tezos nfts
    this.getTezos(num_col)

    
  }

  ngDoCheck() {
    // this.assets.forEach(asset => {
    //   this.doMedia(asset.url, asset.type)
    // })
    
  }

  onImageLoaded(assetId: number) {
    this.assets[assetId].loading = false;
  }

  
  // async getNFTs(){

  //   const num_col = 4

  //   // get opensea nfts
  //   // this.getOpensea(num_col)

  //   // get tezos nfts
  //   this.getTezos(num_col)

  // }



  // async paginated_fetch(params:URLSearchParams, assets: Asset[]) {
    
  //   (await this.api.getOpensea(params)).subscribe(data => {
  //     console.log(data);
  //     if (assets === []) {
  //       assets = data.assets;
  //     } else {
  //       assets = assets.concat(data.assets);
  //     }

  //     if (data.next != null) {
  //       params.append('cursor', data.next);
  //       this.paginated_fetch(params, assets);
  //     } else { console.log('Finished'); }
  //     // this.assets = assets
  //     return assets;
  //   });
    
  // }


  // async paginated_fetch(url:string, params:URLSearchParams, myHeaders:HttpHeaders, previousResponse) {
  //   // console.log(params)
  //   // const response = await fetch(url + params.toString(), myHeaders) // Append the page number to the base URL
  //   const response = this.http.get(url + params.toString(), { headers: myHeaders }).subscribe(newResponse => {
  //     const response_1 = [...previousResponse, ...newResponse['assets']];

  //     if (newResponse['next']) {
  //       params.append('cursor', newResponse['next']);
  //       // console.log(params)
  //       return this.paginated_fetch.call(url, params, myHeaders, response_1);
  //     }
  //     return response_1;
  //   })

    

    // // const newResponse = await response //.json();
    // // console.log(newResponse)
    // // const response_1 = [...previousResponse, ...newResponse['assets']]; // Combine the two arrays
    // if (newResponse['next']) {
    //   params.append('cursor', newResponse['next']);
    //   // console.log(params)
    //   return this.paginated_fetch.call(url, params, myHeaders, response_1);
    // }
    // return response_1;
  // }


  async getOpensea(num_col) {

    // await this.paginated_fetch(this.api.params, []).then(assets => {
      (await this.api.getOpensea(this.api.params)).subscribe(response => {
        let assets = response.assets
      console.log(assets)
      assets.forEach((nft: Asset) => {
        let card = new NFT

        if (nft.animation_original_url) {
          if (nft.animation_original_url.endsWith('mp4')) {
            card.type = 'video'
            card.url = nft.animation_original_url
          } else if (nft.image_original_url) {
            card.type = 'image'
            card.url = nft.image_original_url
          }
        } else if (nft.image_original_url) {
          card.type = 'image'
          card.url = nft.image_original_url
        } else {
          card.type = 'unknown'
          card.url = ''
        }

        card.url = this.fixURL2(card.url)
        
        card.title = nft.name
        // desc = nft['description']
        // creation_date = nft['collection']['created_date']
        
        // #artist name
        // let artist_name = null
        const creator = nft.creator
        if (creator) {
          if (creator.user) {
            if (creator.user.username) {
              card.artist = creator.user.username
            }
          } else {
            card.artist = creator.address
          }
        } else {
          card.artist = 'Unknown'
        }

        card.loading = true

        this.assets.push(card)
        // this.doMedia(card.url, card.type)
        // console.log(this.assets)

      })

      console.log(this.assets.length)

    })

  }

  //   const url_ETH = "https://api.opensea.io/api/v1/assets?"

  //   var params = new URLSearchParams({
  //     "owner":"0x7CE438Bf068c8F47F0F46cB7891Fc7fD0956f117",
  //     "limit":"200"
  //   })
    
  //   const api_key = "9f5c9b08070343e8b7bb5f01054752e4"
  //   var myHeaders = new HttpHeaders({"X-API-KEY": api_key});
  //   // myHeaders.append("X-API-KEY", api_key);
  //   console.log(myHeaders)

  //   // let num_assets = null
  //   // let num_items_col = null
  //   // let item_breaks = null
  //   let type = ''
  //   let img_url = ''

  //   // let assets = this.paginated_fetch(url_ETH, params, myHeaders, [])
  //   // console.log('paginated is called from getOpensea')
  //   let assets = await this.paginated_fetch(url_ETH, params, myHeaders, []).then(data => console.log(data))
  //   // .then(res => {

  //     // console.log('printing results')
  //     console.log(assets)
  //     // assets = []
  //     // num_assets = assets.length
  //     // num_items_col = Math.ceil(assets.length / num_col)
  //     // item_breaks = [...Array(num_col).keys()].map(i => i * num_items_col)

  //     for (let index in this.assets) {
          
  //       let nft = this.assets[index]
  //       console.log(nft)

  //       if (nft['animation_original_url']) {
  //         if (nft['animation_original_url'].endsWith('mp4')) {
  //           type = 'video'
  //           img_url = nft['animation_original_url']
  //         } else if (nft['image_original_url']) {
  //           type = 'image'
  //           img_url = nft['image_original_url']
  //         }
          

  //       } else if (nft['image_original_url']) {
  //         type = 'image'
  //         img_url = nft['image_original_url']
  //       } else {
  //         type = 'unknown'
  //         img_url = ''
  //       }
        
  //       const name = nft['name']
  //       // desc = nft['description']
  //       // creation_date = nft['collection']['created_date']
        
  //       // #artist name
  //       let artist_name = null
  //       const creator = nft['creator']
  //       if (creator) {
  //           if (creator['user']) {
  //               if (creator['user']['username']) {
  //                   artist_name = creator['user']['username']
  //               }
  //           } else {
  //               artist_name = creator['address']
  //           }
  //       } else {
  //           artist_name = 'Unknown'
  //       }
        

  //       this.doCard(img_url, type, name, artist_name)
        
  //     }
        

        
    // }).catch(function(err) {
    //     console.log(err);
    // });

    // return num_items_col, num_assets
  // }


  async getTezos(num_col) {
    
    this.api.getTezos().subscribe(data => {
      
      for (let i = 0; i < Object.keys(data).length; i++) {

        let token = data[i]['token'];
        let meta = token['metadata'];
        if (meta) {

          let card = new NFT;

          // console.log(meta)
          card.url = meta['artifactUri']
          if (card.url) {
            card.url = this.fixURL2(card.url)
          } else {
            card.url = ''
          }
          // card.url = this.fixURL2(card.url)
          card.artist = meta['creators'];
          card.title = meta['name'];

          // let type = ''
          if ('formats' in meta) {
            card.type = meta['formats'][0]['mimeType'];
            card.loading = true

            this.assets.push(card);
            // console.log(format)
          } 
          // else {
          //   card.type = ''
          // }

          

          // console.log(meta)


          // this.doMedia(card.url, card.type)

          // if (token_url) {
          //   // console.log(type)
          //   this.doCard(token_url, type, name, artist)
          // }
        }


      }

      console.log(this.assets.length);

    })
    // .catch(function(err) {
    //   console.log(err);
    // });
  }


  fixURL2(url:string){
    if(url.startsWith("ipfs://ipfs")){
      return "https://ipfs.io/ipfs/"+url.split("ipfs://ipfs/").slice(-1)[0];
    } else if (url.startsWith("ipfs://")) {
      return "https://ipfs.io/ipfs/"+url.split("ipfs://").slice(-1)[0];
    } else {
      return url
    }
  }


  // function doCard(url, type, name, artist, index, item_breaks) {
  doMedia(url: string, type: string) {

    
    const a_el = document.getElementById(url) //document.createElement("a");
    console.log(a_el)
    // a_el.setAttribute('href', this.fixURL2(url))

    // const spinner_container = document.createElement('div')
    // spinner_container.className = 'd-flex justify-content-center'
    // spinner_container.style = 'height:30px'

    // const spinner = document.createElement('div')
    // spinner.className = 'spinner-border'

    
  

    let media = null
    if (type.startsWith('image')) {

      media = document.createElement("img");
      // media.setAttribute('src', fixURL2(url));
      a_el.appendChild(media);
      // media = img

    } else if (type.startsWith('video')) {

      media = document.createElement("video");
      media.setAttribute('width', '100%')
      // video.setAttribute('height', '100%')
      media.setAttribute('loop', 'true')
      // media.setAttribute('src', fixURL2(url))
      media.controls = true;
      media.autoplay = true;
      media.muted = true;
      a_el.appendChild(media);
      // media = video

    } else if (type.startsWith('application')) {

      media = document.createElement("embed")
      // media.setAttribute('src', fixURL2(url))
      // media.width = '100%'
      // media.height = '100%'
      media.type = type
      a_el.appendChild(media);
      // media = embed

    } else if (type.startsWith('text')) {

      media = document.createElement("iframe")
      // media.setAttribute('src', fixURL2(url))
      // media.setAttribute('src', fixURL2(url))
      a_el.appendChild(media);
      // media = iframe
      
    }

    if (media != null) {
      // $(document).ready(function(){
      //   media.on('load',function(){
      //       $('.spinner-border').css('display','none');
      //   });
      // });

      // media.loading="lazy"

      media.setAttribute('data-src', url)
      // media.setAttribute('data-src', this.fixURL2(url))
      media.setAttribute('src', '/assets/imagens/loading.svg')
      // media.setAttribute('data-sizes', 'auto')
      media.className = 'lazyload'
      // media.width = '100%'
      // media.height = '100%'
      // console.log(media.width)
      // media.height = 'auto' //'100%'
      // card_body.appendChild(media)
    }

    console.log(media)

    
  }



}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OpenseaResponse } from './opensea.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url_ETH = "https://api.opensea.io/api/v1/assets?"

  public params = new URLSearchParams({
      "owner":"0x7CE438Bf068c8F47F0F46cB7891Fc7fD0956f117",
      "limit":"200"
    })
    
  private api_key = "9f5c9b08070343e8b7bb5f01054752e4"
  private myHeaders = new HttpHeaders({"X-API-KEY": this.api_key});


  private tezos_url = 'https://api.tzkt.io/'
    // const tezos_address = 'tz1MkJT1ZpqmTzvS9QFJSa4GpaLNRyRaLCYd'
  private tezos_address = 'tz1KrhGtHThyo7WQobeGnrTaFhawwYSRZ6YS'
  private query = `v1/tokens/balances?account=${this.tezos_address}&limit=1000`
  private url_tezos = this.tezos_url + this.query

  constructor(private http:HttpClient) { }
 
 
//  getConfig(){
//    return this.http.get<Customer[]>(this.apiurl);
//  }

  getOpensea(params:URLSearchParams = this.params) {
    return this.http.get<OpenseaResponse>(this.url_ETH + params.toString(), { headers: this.myHeaders })
  }


  getTezos() {
    return this.http.get(this.url_tezos)
  }


}

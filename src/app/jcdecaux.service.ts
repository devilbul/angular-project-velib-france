import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Station} from './station';
import {Contract} from './contract';
import {environment} from '../environments/environment';
import {UrlBuilder} from './urlBuilder';
import 'rxjs/add/operator/catch';

@Injectable()
export class JcdecauxService {
  urlBuilder = new UrlBuilder(environment.JCDECAUX_ROOT, environment.JCDECAUX_TOKEN);

  constructor(private  http: HttpClient) { }

  public getStations(contract_name: string): Observable<Station[]> {
    const result: Observable<Station[]> = this.http.get<Station[]>(
      this.urlBuilder.getUrlForGetStations(contract_name));
    result.catch(this.handleError);
    return result;
  }

  public getContracts(): Observable<Contract[]> {
    const result: Observable<Contract[]> = this.http.get<Contract[]>(
      this.urlBuilder.getUrlForGetContractName());
    result.catch(this.handleError);
    return result;
  }

  private handleError(error: Response | any): Observable<any> {
    let errMsg: string;
    console.debug('My handleError');
    if (error instanceof Response) {}
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}

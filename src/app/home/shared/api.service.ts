import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from 'environments/environment';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public showLoader = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private translate: TranslateService) {
  }

  get(path: string, params: HttpParams = new HttpParams(), showLoader?: boolean): Observable<any> {
    if(false != showLoader) {
      this.showLoader.next(true);
    }
    return this.http.get(`${environment.api_url}${path}`, {headers: this.setHeaders(), params: params}).pipe(finalize(() => {this.showLoader.next(false)}));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      {headers: this.setHeaders()}
    )
  }

  patch(path: string, body: Object = {}): Observable<any> {
    return this.http.patch(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      {headers: this.setHeaders()}
    )
  }

  put(path: string, token: any, body: Object = {}): Observable<any> {
    return this.http.put<any>(
      `${environment.api_url}${path}/${token}`,
      JSON.stringify(body),
      {headers: this.setHeaders()}
    )
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`, {headers: this.setHeaders(), params: params});
  }



  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Content-Language': this.translate.currentLang,
      'Accept': 'application/json'
    };

    return new HttpHeaders(headersConfig);
  }

}

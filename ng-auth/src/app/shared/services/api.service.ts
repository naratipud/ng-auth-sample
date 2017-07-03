import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { JwtService } from './jwt.service';
import { environment } from 'environments/environment';

@Injectable()
export class ApiService {

  constructor(
    private http: Http,
    private jwtService: JwtService
  ) { }

  private setHeaders(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    // const headersConfig = {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json'
    // };

    if (this.jwtService.getToken()) {
      // headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
      headers.append('Authorization', `Token ${this.jwtService.getToken()}`);
    }
    // return new Headers(headersConfig);
    return headers;
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  get(endpoint: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    const option = { headers: this.setHeaders(), search: params };
    return this.http.get(`${environment.api_url}${endpoint}`, option)
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  put(endpoint: string, body: Object = {}): Observable<any> {
    const option = { headers: this.setHeaders() };
    return this.http.put(`${environment.api_url}${endpoint}`, JSON.stringify(body), option)
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  post(endpoint: string, body: Object = {}): Observable<any> {
    const option = { headers: this.setHeaders() };
    return this.http.post(`${environment.api_url}${endpoint}`, JSON.stringify(body), option)
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  delete(endpoint): Observable<any> {
    const option = { headers: this.setHeaders() };
    return this.http.delete(`${environment.api_url}${endpoint}`, option)
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }
}

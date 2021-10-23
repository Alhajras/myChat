import {Injectable} from '@angular/core'
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

const PAGE_SIZE = 25
export const PAGE_SIZE_PARAM = 'limit'
export const PAGE_SIZE_NO_LIMIT = 'all'

@Injectable({
  providedIn: 'root',
})
export class ChatMessageService {
    private readonly baseUrl: string = '/api/'
  endpointPath = 'messages/'

  constructor(private readonly httpClient: HttpClient) {
  }

  request<T>(method: string, path: string, params?: HttpParams, body?: any): Observable<T> {
         console.log(this.baseUrl + path)
    let request = this.httpClient.request<T>(method, this.baseUrl + path, {body, withCredentials: true, params}).toPromise()
      .then(a => console.log(a))
      return this.httpClient.request<T>(method, this.baseUrl + path, {body, withCredentials: true, params})
  }

  getMessages<T>(path: string, params: HttpParams = new HttpParams()): Observable<[]> {
    if (!params.has(PAGE_SIZE_PARAM)) {
      params = params.set(PAGE_SIZE_PARAM, PAGE_SIZE)
    }
    return this.get(path, params)
  }

  get<T>(path: string, params?: HttpParams): Observable<T> {
    return this.request<T>('GET', path, params)
  }

  // getMessages(): ChatMessage[] {
  //   return [
  //     {
  //       message: 'Hello there',
  //       timestamp: '22:42',
  //       seen: true,
  //       channel: 'Facebook'
  //     },
  //     {
  //       message: 'How are you?',
  //       timestamp: '22:42',
  //       seen: true,
  //       channel: 'Facebook'
  //     },
  //     {
  //       message: 'I am fine thanks',
  //       timestamp: '22:42',
  //       seen: true,
  //       channel: 'Local'
  //     },
  //   ]
  // }
}

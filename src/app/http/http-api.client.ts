/* this is a place to put things common across different uses of the PreonDock
 * API; parsing, pagination, maybe converting responses into typed objects of
 * some kind if we decide that's something we want to do */

import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
// import { ListResponse } from './models/list-response.model'
import { Observable } from 'rxjs'

const PAGE_SIZE = 25
export const PAGE_SIZE_PARAM = 'limit'
export const PAGE_SIZE_NO_LIMIT = 'all'

@Injectable({
  providedIn: 'root',
})
export class HttpApiClient {
  private readonly baseUrl: string = '/api/'

  constructor (private readonly httpClient: HttpClient) {}

  request<T> (method: string, path: string, params?: HttpParams, body?: any): Observable<T> {
    return this.httpClient.request<T>(method, this.baseUrl + path, { body, withCredentials: true, params })
  }

  getList<T> (path: string, params: HttpParams = new HttpParams()): Observable<[]> {
    if (!params.has(PAGE_SIZE_PARAM)) {
      params = params.set(PAGE_SIZE_PARAM, PAGE_SIZE)
    }
    return this.get(path, params)
  }

  get<T> (path: string, params?: HttpParams): Observable<T> {
    return this.request<T>('GET', path, params)
  }

  post<T> (path: string, body?: any): Observable<T> {
    return this.request<T>('POST', path, undefined, body)
  }

  put<T> (path: string, body?: any): Observable<T> {
    return this.request<T>('PUT', path, undefined, body)
  }

  patch<T> (path: string, body?: any): Observable<T> {
    return this.request<T>('PATCH', path, undefined, body)
  }

  delete<T> (path: string, body?: any): Observable<T> {
    return this.request<T>('DELETE', path, undefined, body)
  }

  refreshCsrfToken () {
    return this.get('auth/login/')
  }
}

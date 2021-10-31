import { ChatMessage } from "../models/model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core'
import { ListResponse } from "../models/list-response.model";
import { Observable } from "rxjs";

const PAGE_SIZE = 50
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
    return this.httpClient.request<T>(method, this.baseUrl + path, {body, withCredentials: true, params})
  }

  getList<T>(path: string, params: HttpParams = new HttpParams()): Observable<ListResponse<T>> {
    if (!params.has(PAGE_SIZE_PARAM)) {
      params = params.set(PAGE_SIZE_PARAM, PAGE_SIZE)
    }
    return this.get(path, params)
  }

  postMessage(message: Partial<ChatMessage>): Observable<ChatMessage> {
    return this.post<ChatMessage>(this.endpointPath, message)
  }

  get<T>(path: string, params?: HttpParams): Observable<T> {
    return this.request<T>('GET', path, params)
  }

  post<T>(path: string, body?: any): Observable<T> {
    return this.request<T>('POST', path, undefined, body)
  }
}

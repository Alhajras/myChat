import {Injectable} from '@angular/core'
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ChatMessage} from "../models/model";

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
    return this.httpClient.request<T>(method, this.baseUrl + path, {body, withCredentials: true, params})
  }

  getMessages<T>(path: string, params: HttpParams = new HttpParams()): Observable<[]> {
    if (!params.has(PAGE_SIZE_PARAM)) {
      params = params.set(PAGE_SIZE_PARAM, PAGE_SIZE)
    }
    return this.get(path, params)
  }

  postMessage(project: Partial<ChatMessage>): Observable<ChatMessage> {
    return this.post<ChatMessage>(this.endpointPath, project)
  }

  get<T>(path: string, params?: HttpParams): Observable<T> {
    return this.request<T>('GET', path, params)
  }

    post<T> (path: string, body?: any): Observable<T> {
    return this.request<T>('POST', path, undefined, body)
  }


}

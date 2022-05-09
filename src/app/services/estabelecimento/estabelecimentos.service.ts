import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Estabelecimento } from '../../models/estabelecimento';

@Injectable({
  providedIn: 'root'
})

export class EstabelecimentosService {

  url = 'http://localhost:3000/operations';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os estabelecimentos
  getEstabelecimentos(): Observable<Estabelecimento[]> {
    return this.httpClient.get<Estabelecimento[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  addEstabelecimentos(file: File): Observable<HttpEvent<any>> {

    let formData = new FormData();
    formData.append('upload', file);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', this.url, formData, options);
    return this.httpClient.request(req);
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}

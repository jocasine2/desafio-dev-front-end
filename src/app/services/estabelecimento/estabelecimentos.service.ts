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
  fileName='cnab';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os estabelecimentos
  getEstabelecimentos(search: any): Observable<Estabelecimento[]> {

    var url = '';
    if(search == undefined){
      url = this.url
    }else{
      url = this.url+'?search[value]='+search
    }

    return this.httpClient.get<Estabelecimento[]>(url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  fileUploadParser(file: File){
    // console.log(file);
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);

      const upload$ = this.httpClient.post(this.url, formData, {
          reportProgress: true,
          observe: 'events'
      });

      upload$.subscribe(event => {

      })
    }
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

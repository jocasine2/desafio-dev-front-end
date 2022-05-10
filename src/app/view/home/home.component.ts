import { Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { EstabelecimentosService } from '../../services/estabelecimento/estabelecimentos.service';
import { Estabelecimento } from '../../models/estabelecimento';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  estabelecimento = {} as Estabelecimento;
  estabelecimentos: any[];
  total: any;
  @ViewChild("search") search: ElementRef | undefined;
  @ViewChild("file") file: ElementRef | undefined;


  constructor(private estabelecimentosService: EstabelecimentosService) {
    this.estabelecimentos = []
  }

  ngOnInit() {
    this.getEstabelecimentos();
  }

   // Chama o serviço
   getEstabelecimentos() {
     var s = this.search?.nativeElement.value
    //  console.log(s);
    this.estabelecimentosService.getEstabelecimentos(s).subscribe((Response: any) => {
      this.estabelecimentos = Response.data;
      var total = 0
      this.estabelecimentos.forEach(function (operacao) {
        total += operacao.value
      });

      this.total = total
    });
  }

  fileUploadParser(){
    var file = this.file?.nativeElement.files[0]

    if(file != undefined){
      // console.log(file);
      this.estabelecimentosService.fileUploadParser(file)
    }
  }

}

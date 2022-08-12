import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { Pais, PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region  : ['', Validators.required],
    pais    : ['', Validators.required],
    frontera: ['', Validators.required]

  })


  //llenar selectores
  regiones:  string[]    = [];
  paises:    PaisSmall[] = [];
  fronteras: string[] | undefined    = [];


  constructor(private fb: FormBuilder,
              private paisesServce: PaisesService) { }

  ngOnInit(): void {
    this.regiones = this.paisesServce.regiones

    //Cuando cambie la region

  //   this.miFormulario.get('region')?.valueChanges
  //     .subscribe(region => {
  //       console.log(region)

  //       this.paisesServce.getPaisesPorRegion( region )
  //         .subscribe(paises => {
  //           console.log(paises)
  //           this.paises = paises
  //         })
  //     })

  this.miFormulario.get('region')?.valueChanges
  .pipe(
    tap( ( _ ) =>{
      this.miFormulario.get('pais')?.reset('');
    } ),
    switchMap(region => this.paisesServce.getPaisesPorRegion( region ))
  )
    .subscribe(paises => {
      //console.log(paises);
      this.paises = paises;
    })

    //Cuando cambie el pais
    this.miFormulario.get('pais')?.valueChanges
    .pipe(
      tap( ( code ) => {
        this.fronteras = [];
        this.miFormulario.get('frontera')?.reset('');
        console.log(code)
      }),
      switchMap( code => 
        this.paisesServce.getPaisPorCode( code ))
    )
    //getPaisPorCode regresa un pais
    .subscribe(pais => {
      console.log('pais', pais )
     this.fronteras =  pais ? pais[0].borders : [];
    })
  }

  guardar(){
    console.log(this.miFormulario.value)
  }

}

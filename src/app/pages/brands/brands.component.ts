import { Component, OnInit } from '@angular/core';
import { BrandPipe } from '../../shared/pipes/brand/brand.pipe';
import { TranslatePipe } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { UpperCasePipe } from '@angular/common';
import { Ibrand } from '../../shared/interfaces/brand/ibrand';
import { BrandsService } from '../../core/services/brands/brands.service';

@Component({
  selector: 'app-brands',
  imports: [BrandPipe, TranslatePipe, FormsModule, UpperCasePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
result:string  = ''

 brands:Ibrand[] = []

  constructor(private _brandsService:BrandsService){}

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands(): void {
    this._brandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brands = res.data;
      }
    });
  }
}

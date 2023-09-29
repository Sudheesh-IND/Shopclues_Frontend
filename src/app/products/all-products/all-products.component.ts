import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{

  allProducts:any={}
  searchKey:string=''

  constructor(private api:ApiService){}
  ngOnInit(): void {

    
    
    this.api.getAllProducts().subscribe((response:any)=>{
      console.log(response)
      this.allProducts=response
    })

    // this.searchKey=this.api.searchTerm
    this.api.searchTerm.subscribe((response:any)=>{
      this.searchKey=response
      console.log(this.searchKey)
    })
  }

}

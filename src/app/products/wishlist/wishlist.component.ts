import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  wishlistProducts:any={}
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.getWishListProducts()
  
  }
  getWishListProducts(){
    this.api.getWishlistProducts().subscribe((response:any)=>{
      console.log(response)
      this.wishlistProducts=response
    },(response:any)=>{
      console.log(response.error)
    })
  }

  deleteItem(id:any){
    this.api.deleteItem(id).subscribe((response:any)=>{
      //assign remaining wishlist item to wishlists
       this.wishlistProducts=response
       alert('Product removed successfully')
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit{

  productId:String=''
  productDetails:any={}

  constructor(private activatedRoute:ActivatedRoute,private api:ApiService){}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((response:any)=>{
       this.productId=response.id
    })
    this.api.viewProduct(this.productId).subscribe((response:any)=>{
      console.log(response)
      this.productDetails=response
    },(response:any)=>{
      alert(response.error)
    })
    
  }
  addToWishlist(){
    const {id,title,price,image}=this.productDetails
    this.api.addToWishlist(id,title,price,image).subscribe((response:any)=>{
      alert('Product added to wishlist')
    },(response:any)=>{
      alert('Product already in wiswhlist')
    })
  }

  //add to cart
  addToCart(product:any){

    //assign quantity inside product object
    Object.assign(product,{quantity:1})
        console.log(product)

        //api call for add to product
        this.api.addToCart(product).subscribe((response:any)=>{
          alert(response)
          this.api.getCartCount()
        },(response:any)=>{
          alert(response.error)
        })
  }



}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL='https://shopcluesbysudheesh.onrender.com'

  cartItemCount=new BehaviorSubject(0)

  searchTerm=new BehaviorSubject('')
  //behaviour subject in rxjs is used to pass data from one component to another component

  constructor(private http:HttpClient) {
    this.getCartCount()
   }

  //api caall to get all prodcts
  getAllProducts(){
    return this.http.get(`${this.BASE_URL}/products/all-products`)
  }

  //api call to view a particualr product
  viewProduct(id:any){
    return this.http.get(`${this.BASE_URL}/products/viewproduct/${id}`)
  }

  //add to wishlist
  addToWishlist(id:any,title:any,price:any,image:any){
    const body={
      id,title,price,image
    }
    return this.http.post(`${this.BASE_URL}/wishlist/addtowishlist`,body)
  }

  //get all products in wishlist
  getWishlistProducts(){
    return this.http.get(`${this.BASE_URL}/wishlist/getwishlist`)
  }

  //delete product from wishllist
  deleteItem(id:any){
    return this.http.delete(`${this.BASE_URL}/wishlist/delete/${id}`)
  }

  //add to cart
  addToCart(product:any){ //take product as the image
    //take the id image title price quantity from product

    const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity
    }

    return this.http.post(`${this.BASE_URL}/carts/addtocart`,body)

  }

  //api call to get cart item
  getCartItem(){
    return this.http.get(`${this.BASE_URL}/carts/getcartitem`)
  }

  //adding cart count
  getCartCount(){
    this.getCartItem().subscribe((response:any)=>{
      this.cartItemCount.next(response.length)
    })
  }

  //delewting cart item
  deleteCartItem(id:any){
    return this.http.delete(`${this.BASE_URL}/carts/deletecartitem/${id}`)
  }

  //increment quantity of product
  productIncrement(id:any){
    return this.http.get(`${this.BASE_URL}/carts/increment/${id}`)
  }

  //decrementing a product
  productDecrement(id:any){
    return this.http.get(`${this.BASE_URL}/carts/decrement/${id}`)

  }
}

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  name:string=''
  housenumber:string=''
  street:string=''
  state:string=''
  pincode:any=''
  mobile:string=''
  seeDeliveryDetails:boolean=false
  allProducts:any[]=[]
  isOfferShowing:boolean=false
  //for hiiding discount button
  discountStatus:boolean=false
  //showing paypal button
  showPaypal:boolean=false
cartTotal=0
//variable for the integration of paypal
public payPalConfig?: IPayPalConfig;
//variable for showing paypal success
showSuccess:boolean=false
  constructor(private api:ApiService,private fb:FormBuilder){}
  ngOnInit(): void {
    this.getCartItem()
    this.initConfig();
  
  }

  getCartItem(){
    this.api.getCartItem().subscribe((response:any)=>{
      console.log(response)
      this.allProducts=response
      this.getCartTotal()
    },(response:any)=>{
      console.log(response.error)
    })
  }

  deleteCartItem(id:any){
     this.api.deleteCartItem(id).subscribe((response:any)=>{
       this.allProducts=response
       this.api.getCartCount()
       this.getCartTotal()
     },(response:any)=>{
      alert(response.error)
     })
  }

  //getting grandtotal of all products
  getCartTotal(){
    let total=0
    this.allProducts.forEach((item:any)=>{
      total+= item.grandTotal
      this.cartTotal=Math.ceil(total)
      console.log(this.cartTotal)
    })

  }

  //incrementing product
  productIncrement(id:any){
    this.api.productIncrement(id).subscribe((response:any)=>{
      this.allProducts=response
      this.getCartTotal()
    })
  }

  //decrement product
  productDecrement(id:any){
    this.api.productDecrement(id).subscribe((response:any)=>{
      this.allProducts=response
      this.getCartTotal()
    })
  }

  checkOutForm=this.fb.group({
    Name:[''],
    Housenumber:[''],
    Street:[''],
    State:[''],
    Pincode:[''],
    Mobilenumber:['']
  })

  submitCheckout(){
    if(this.checkOutForm.valid){
      this.seeDeliveryDetails=true
      this.name=this.checkOutForm.value.Name||''
      this.housenumber=this.checkOutForm.value.Housenumber||''
      this.street=this.checkOutForm.value.Street||''
      this.state=this.checkOutForm.value.State||''
      this.pincode=this.checkOutForm.value.Pincode||''
      this.mobile=this.checkOutForm.value.Mobilenumber||''
    }else{
      alert('Please enter valid details')
    }

  }

  //showing offer
  showOffer(){
  this.isOfferShowing=!this.isOfferShowing
  }

  //calculating discount
  calculateDiscount(discount:any){

    this.cartTotal=this.cartTotal*(100-discount)/100
    this.discountStatus=true
    
  }

  //function for paypal integration
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details: any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

  showPaypalButton(){
    this.showPaypal=true
  }

}

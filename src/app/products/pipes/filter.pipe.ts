import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {


 

  transform(totalProducts:any[],searchTerm:string,propsName:string): any[] {
    
    const  result:any[]=[]

    if(!totalProducts||searchTerm==''||propsName==''){
      return totalProducts
    }

    totalProducts.forEach((products:any)=>{
      if(products[propsName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
        result.push(products)

      }
    })
    return result;
  }

}

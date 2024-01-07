import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { product } from '../component/product-view/productmodal'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public cartitemList: any=[];
  public productList = new BehaviorSubject<any>([]);
  constructor(private http:HttpClient) { }

  getproduct(){
    return this.http.get<product[]>('https://dummyjson.com/products')
  }

  getproductbyid(id:string){
    return this.http.get('https://dummyjson.com/products/'+id)
  }

    addtocart(data:product){
      this.cartitemList.push(data);
      this.productList.next(this.cartitemList);
      console.log(this.cartitemList)
    }

    products(){
      return this.productList.asObservable();
    }

    removecartitem(data:product){
      this.cartitemList.map((a:product,index:product)=>{
        if(data.id===a.id){
          this.cartitemList.splice(index,1)
        }
      })
      this.productList.next(this.cartitemList);

    }


    //total cacul
    calcullateprice(){
      let total =0;
      this.cartitemList.map((a:any)=>{
        total += a.price;
      })
      return total;
    }

    //remote all item

    removeallitems(){
      this.cartitemList = [];
      this.productList.next(this.cartitemList);
    }

}

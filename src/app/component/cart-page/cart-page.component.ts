import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { product } from '../product-view/productmodal';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  showproduct:any=[];
  public totalamount :number=0;
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.api.products().subscribe((res)=>{
      this.showproduct=res;
      this.totalamount=this.api.calcullateprice();
      console.log("total amt is",this.totalamount)
    } )
   
  }

  deleteitem(item:product){
    this.api.removecartitem(item)
      
    }

    Empty(){
      this.api.removeallitems();
    }

}

import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';
import { productInter } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css']
})
export class WaiterComponent implements OnInit {
   productsList: productInter[] = [];

  constructor(private authService:AuthenticationServiceService) { }

  ngOnInit(): void {
   this.getProducts()
  }

  getProducts(): void {
  this.authService.getProducts().subscribe((resp => {
  this.productsList = resp
  this.productsList.forEach(product=> {
  this.authService.getImageUrl(product.image, '../../../assets/images/Image20240112141757.png').subscribe(result => {
  product.image = result
  console.log(result);
  
  })
  })
  console.log(this.productsList);
  }))
  }

}

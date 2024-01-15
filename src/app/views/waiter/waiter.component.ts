import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { productInter } from 'src/app/shared/interfaces/product';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css']
})
export class WaiterComponent implements OnInit {
  productsList: productInter[] = [];
  breakfastMenu: productInter[] = [];
  lunchAndDinnerMenu: productInter[] = [];
  currentMenu: productInter[] = [];
  isLunchAndDinnerSelected: boolean = false;
  isBreakfastSelected: boolean = true;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.ordersService.getProducts().subscribe((resp => {
      this.productsList = resp
      this.productsList.forEach(product => {
        this.ordersService.getImageUrl(product.image, '../../../assets/images/Image20240112141757.png').subscribe(result => {
          product.image = result
        })
      })
    this.filterMenus();
    }))
  }
  filterMenus(): void {
    this.breakfastMenu = this.ordersService.filterBreakfastMenu(this.productsList);
    this.lunchAndDinnerMenu = this.ordersService.filterLunchAndDinnerMenu(this.productsList);
    this.currentMenu = this.breakfastMenu;
  }

  showBreakfastMenu(): void {
    if (this.isBreakfastSelected) {
   this.currentMenu = this.breakfastMenu;
    }
  }

  handleBreakfastSelection(): void {
    this.isBreakfastSelected = true;
    this.isLunchAndDinnerSelected = false;
    this.showBreakfastMenu()
  }

  showLunchAndDinnerMenu(): void {
    this.currentMenu = this.isLunchAndDinnerSelected ? this.lunchAndDinnerMenu : this.breakfastMenu;
  }

  handleLunchAndDinnerSelection(): void {
    this.isLunchAndDinnerSelected = true;
    this.isBreakfastSelected = false;
    this.showLunchAndDinnerMenu()
  }

}

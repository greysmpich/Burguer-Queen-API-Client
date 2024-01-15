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
  isLunchAndDinnerDisabled: boolean = false;
  isBreakfastDisabled: boolean = true;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getProducts();
    console.log( 'breakfast selected', this.isBreakfastSelected, 'breakfast disabled', this.isBreakfastDisabled );
    console.log('lunch not selected', this.isLunchAndDinnerSelected, 'lunch hot disabled', this.isLunchAndDinnerDisabled);
    
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
    const breakfastBeverages = [1, 5];
    const lunchBeverages = [2, 6, 7];

    this.breakfastMenu = this.productsList.filter(product => {
      return product.type === 'Breakfast' || breakfastBeverages.includes(product.id);
    });

    this.lunchAndDinnerMenu = this.productsList.filter(product => {
      return product.type === 'Lunch' || product.type === 'Sides' || lunchBeverages.includes(product.id);
    });

    this.currentMenu = this.breakfastMenu;
  }

  showBreakfastMenu(): void {
    if (this.isBreakfastSelected) {
      this.currentMenu = this.breakfastMenu;
    }
  }

  handleBreakfastSelection(): void {
    this.isBreakfastSelected = true;
    this.isBreakfastDisabled = true;
    this.isLunchAndDinnerDisabled = false;
    this.isLunchAndDinnerSelected = false;
    console.log('breakfast disabled', this.isBreakfastDisabled, 'breakfast  selected', this.isBreakfastSelected);
    console.log('lunch not disabled', this.isLunchAndDinnerDisabled, 'lunch not selected', this.isLunchAndDinnerSelected);

    this.showBreakfastMenu()
  }

  showLunchAndDinnerMenu(): void {
    this.currentMenu = this.isLunchAndDinnerSelected ? this.lunchAndDinnerMenu : this.breakfastMenu;
  }

  handleLunchAndDinnerSelection(): void {
    this.isLunchAndDinnerSelected = true;
    this.isLunchAndDinnerDisabled = true;
    this.isBreakfastDisabled = false;
    this.isBreakfastSelected = false;
    console.log('lunch disabled', this.isLunchAndDinnerDisabled, 'lunch selected', this.isLunchAndDinnerSelected);

    console.log('breakfast not disabled', this.isBreakfastDisabled, 'breakfast not selected', this.isBreakfastSelected);
    this.showLunchAndDinnerMenu()
  }

}

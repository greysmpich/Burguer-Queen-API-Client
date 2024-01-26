import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-waiter-order-status',
  templateUrl: './waiter-order-status.component.html',
  styleUrls: ['./waiter-order-status.component.css']
})
export class WaiterOrderStatusComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  backToMenu() {
    this.router.navigate(['/waiter']);
  }
}

import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-lunch-and-dinner-button',
  templateUrl: './lunch-and-dinner-button.component.html',
  styleUrls: ['./lunch-and-dinner-button.component.css']
})
export class LunchAndDinnerButtonComponent implements OnInit {
  @Input() isSelected: boolean = false;
  @Input() isDisabled: boolean = false;
  @Output() selected: EventEmitter<void> = new EventEmitter<void>();


  constructor() { }

  ngOnInit(): void {
  }

  select(): void {
    if(!this.isDisabled){
      this.selected.emit();
    }
  }

  getButtonSelectedStyle(): { [key: string]: string} {
    return {
      'background-color': this.isSelected ? '#EE6A09' : '#D9D9D9',
      'color': this.isSelected ? 'white' : 'black',
    }
  }
}

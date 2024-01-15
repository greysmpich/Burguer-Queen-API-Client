import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-breakfast-button',
  templateUrl: './breakfast-button.component.html',
  styleUrls: ['./breakfast-button.component.css']
})
export class BreakfastButtonComponent implements OnInit {
  @Input() isSelected: boolean = false;
  @Output() selected: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  select(): void {
      this.selected.emit();
  }

  getButtonSelectedStyle(): { [key: string]: string} {
    return {
      'background-color': this.isSelected ? '#EE6A09' : '#D9D9D9',
      'color': this.isSelected ? 'white' : 'black',
    }
  }
  
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  currentPage = 1;
  data = [];

  constructor() {
  }

  ngOnInit(): void {
    this.dataCollection();
  }

  dataCollection() {
    for (let i = 0; i < 1000; i++) {
      const item = 'Item' + i;
      this.data.push(item);
    }
  }
}

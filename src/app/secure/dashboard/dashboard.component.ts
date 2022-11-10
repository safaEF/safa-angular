import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import { map } from 'rxjs/operators';
import * as c3 from 'c3';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private orderService: OrderService) {
  }
  c3

  ngOnInit(): void {
    let chart = c3.generate({
      bindto: '#chart',
      data: {
        x: 'x',
        columns: [
          ['x'],
          ['Sales'],
        ],
        types: {
          Sales: 'bar'
        }
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d'
          }
        }
      }
    });

    this.orderService.chart()
    .subscribe(( res: any) =>{
      var x:any[]=res.data.map(r => r.date);
      var sales:any=res.data.map(r => r.sum)
      x.splice(0,0,'x'),
      sales.splice(0,0,'Sales')
      
      chart.load({
        columns: [x,sales
          
        ]
      });
    })
    
    
   
    
      
  }
  

}

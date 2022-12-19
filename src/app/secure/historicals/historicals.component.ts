import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Historical } from 'src/app/interfaces/historical';
import { AuthService } from 'src/app/services/auth.service';
import { HistoricalService } from 'src/app/services/historical.service';

@Component({
  selector: 'app-historicals',
  templateUrl: './historicals.component.html',
  styleUrls: ['./historicals.component.css']
})
export class HistoricalsComponent implements OnInit {
historicals: Historical [] = [];

  constructor(private authService: AuthService,
    private router: Router,
    private historicalService: HistoricalService) { }

  ngOnInit(): void {
    this.load();
  }

  load(page = 1): void {
    this.historicalService.all().subscribe(
      res => {
        this.historicals = res;
        
      },
      error => {
         if (error.status == 401) {
            this.authService.refresh({refresh :localStorage.getItem("refresh_token") }).subscribe((res) => {
              localStorage.setItem('access_token', res.access),
              this.historicalService.all().subscribe((res) => {
                this.historicals = res
              },
              )
            },error=> {  this.router.navigate(['/login'])  })
        }
      }
    );
  }

}

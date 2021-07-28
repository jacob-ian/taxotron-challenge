import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  private route: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateRouteFromUrl(event.url);
      });
  }

  private updateRouteFromUrl(url: string): void {
    this.route = url.split('/')[1].split('?')[0];
  }

  ngOnInit() {}

  public getBackgroundSide(): 'left' | 'right' {
    return this.route === '' ? 'left' : 'right';
  }
}

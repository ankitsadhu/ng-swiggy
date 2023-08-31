import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CoreService } from './services/core.services';
import { Subject, take, takeUntil } from 'rxjs';
import { resturant } from './pages/welcome/models/resturant.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  readonly IMG_BASE_PATH ='../assets/img/resturants/'
  isCollapsed = false;
  isMobile: boolean = false;
  restaurantsData!: resturant[];
  searchText = '';
  searchedRestaurants: resturant[] = [];
  destroy = new Subject();
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobile();
  }

  constructor(
    private coreService: CoreService,
    public router: Router,
  ) {}

  ngOnInit() {
    this.checkMobile();
    this.coreService.getAllResturant().pipe(takeUntil(this.destroy)).subscribe(restaurantsData => {
      this.restaurantsData = restaurantsData;
      this.coreService.setAllRestaurantMetaData(restaurantsData);
    })
  }

  checkMobile() {
    this.isMobile = window.innerWidth < 575; 
  }

  onSearchRestaurant() {
    if(this.searchText == '') {
      this.searchedRestaurants = [];
    } else {
      this.searchedRestaurants = this.restaurantsData.filter(resturant => {
        if(resturant.name.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()) || resturant.cuisines.some(e => e.toLowerCase().includes(this.searchText.toLowerCase()))) return true;
        return false;
      })
    }
  }

  navigateToRestaurant(id: string) {
    this.searchText = '';
    this.searchedRestaurants = [];
    this.router.navigateByUrl(`/restaurant/${id}`);
  }

  closeSearchBar() {
    this.searchText = '';
    this.searchedRestaurants = [];
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }
}

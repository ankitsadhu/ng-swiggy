import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ResturantService } from './services/resturants.service';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { resturant } from './models/resturant.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  readonly BASE_CLOUDNARY_ID = '../../../assets/img/resturants/';

  resturantsDataError!: Observable<boolean>;
  resturantsImmutableData!:  resturant[];
  resturantsData!: resturant[];
  isOnlyShowing4PlusRating = false;
  isSortByFilterOptionOpen = false;
  destroy = new Subject();
  
  radioOptions = [
    { label: 'Rating: High to Low ', value: 'avgRating,des' },
    { label: 'Rating: Low to High', value: 'avgRating,aes' },
  ];

  selectedOption: string = ''; // Holds the selected option

  offers = [
    {name: "GET 50% OFF ON FIRST ORDER", imgSrc: "../../../assets/img/offers/offer1.webp", id: "41350"},
    {name: "Rakhi", imgSrc: "../../../assets/img/offers/offer2.webp", id: ""},
    {name: "GET 20% OFF", imgSrc: "../../../assets/img/offers/offer3.webp", id: "167578"},
    {name: "Barbeque Nation", imgSrc: "../../../assets/img/offers/offer4.webp", id: "577513"},
    {name: "TOP BRANDS TOP OFFERS", imgSrc: "../../../assets/img/offers/offer5.webp", id: ""}
  ];

  categories = [
    {name: 'Biryani', imgSrc: "../../../assets/img/categories/Biryani.webp"},
    {name: 'Burger', imgSrc: "../../../assets/img/categories/Burger.webp"},
    {name: 'Cakes', imgSrc: "../../../assets/img/categories/Cakes.webp"},
    {name: 'Chinese', imgSrc: "../../../assets/img/categories/Chinese.webp"},
    {name: 'Chole Bature', imgSrc: "../../../assets/img/categories/Chole_Bature.webp"},
    {name: 'Dosa', imgSrc: "../../../assets/img/categories/Dosa.webp"},
    {name: 'Ice Creams', imgSrc: "../../../assets/img/categories/Ice_Creams.webp"},
    {name: 'North Indian', imgSrc: "../../../assets/img/categories/North_Indian.webp"},
    {name: 'Paratha', imgSrc: "../../../assets/img/categories/Paratha.webp"},
    {name: 'Pav Bhaji', imgSrc: "../../../assets/img/categories/Pav_Bhaji.webp"},
    {name: 'Pizza', imgSrc: "../../../assets/img/categories/Pizza.webp"},
    {name: 'Rolls', imgSrc: "../../../assets/img/categories/Rolls.webp"}
  ]
  constructor(
    public router: Router,
    private resturantService: ResturantService
  ) { }

  
  ngOnInit() {
    this.resturantService.getAllResturant().pipe(takeUntil(this.destroy)).subscribe(
      (data: resturant[]) => {
        this.resturantsImmutableData = data;  
        this.resturantsData = data
      }, error => {
          this.resturantsDataError = error;
      }
    )
  }

  showFourPlusRateResturants() {
    this.isOnlyShowing4PlusRating = !this.isOnlyShowing4PlusRating;
    if(this.isOnlyShowing4PlusRating){
      this.resturantsData = this.resturantsData.filter(restaurant => restaurant.avgRating >= 4);
      this.onSortFilterSelection();
    } else {
      this.resturantsData = this.resturantsImmutableData;
      this.onSortFilterSelection();
    }
  }

  toggleSortByOptions() {
    this.isSortByFilterOptionOpen = !this.isSortByFilterOptionOpen;
  }

  closeSortByOptions() {
    this.isSortByFilterOptionOpen = false
  }

  smoothScroll(target: any) {
    const elRef =  document.getElementById(target);
    if(elRef !== null) {
      elRef?.scrollIntoView({ behavior: 'smooth', block: 'center'})
      elRef.classList.add("pulse");
      setTimeout(()=> {elRef.classList.remove("pulse")}, 1500)
    }
  }

  onSortFilterSelection() {
    const [optionName, oderBy] = this.selectedOption.split(',');

    switch(optionName) {
      case 'avgRating':
        oderBy == 'aes'
        ? this.resturantsData.sort((a,b) => a.avgRating > b.avgRating ? 1 : -1)
        : this.resturantsData.sort((a,b) => a.avgRating < b.avgRating ? 1 : -1)
        break;
      default:
        console.warn('No case to handle');
    }
  }

  navigateToRestaurant(id: string) {
    this.router.navigateByUrl(`/restaurant/${id}`)
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

}

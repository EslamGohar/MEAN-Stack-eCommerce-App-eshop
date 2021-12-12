import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: []
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endSub$: Subject<any> = new Subject()

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().pipe(takeUntil(this.endSub$)).subscribe( (categories:any) => {
      this.categories = categories.data;
    })
  }

  ngOnDestroy() {
    this.endSub$.next()
    this.endSub$.complete()
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { Location } from '@angular/common';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: []
})
export class CategoriesFormComponent implements OnInit {

  // make the variable 'form' available
  form!: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentCategoryId = '';

  constructor(
    private formBuilder: FormBuilder, 
    private categoriesService: CategoriesService, 
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Reactive Form
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color:['#fff']
    })

    this._checkEditMode()
  }

  onSubmit() {
    this.isSubmitted = true;

    if(this.form.invalid) return;

    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    }

    if (this.editmode) {
      this._updateCategory(category)
    } else {
      this._addCategory(category)
    }
  }

  OnCancel() {
    this.location.back()
  }

  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe(
      (category: Category) => {
        this.messageService.add({
          severity:'success', 
          summary:'Success', 
          detail:`Category ${category.name} is created`
        })
        timer(2000).toPromise().then(() => {
          this.location.back()
        })
      },
      () => {
        this.messageService.add({
          severity:'error', 
          summary:'Error', 
          detail:'Category is not created'
        })
      }
    )
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe(
      (category: Category) => {
        this.messageService.add({
          severity:'success', 
          summary:'Success', 
          detail:`Category ${category.name} is updated!`
        })
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back()
          })
      },
      () => {
        this.messageService.add({
          severity:'error', 
          summary:'Error', 
          detail:'Category is not updated'
        })
      }
    )
  }

  private _checkEditMode(){
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentCategoryId = params.id

        this.categoriesService.getOneCategory(params.id).subscribe( (category:any) => {
          this.categoryForm.name.setValue(category.data.name)
          this.categoryForm.icon.setValue(category.data.icon)
          this.categoryForm.color.setValue(category.data.color)
        })
      }
    })
  }

  // to avoid the long name in forms, use get/set methods
  get categoryForm() {
    return this.form.controls
  }

}

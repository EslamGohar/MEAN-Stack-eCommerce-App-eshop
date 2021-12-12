import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Product, ProductsService } from '@bluebits/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: []
})
export class ProductsFormComponent implements OnInit {
  editmode = false;
  form: FormGroup;
  isSubmitted = false;
  categories = [];
  imageDisplay: string | ArrayBuffer;
  currentProductId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false]
    })
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((category: any) => {
      this.categories = category.data;
    })
  }

  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity:'success', 
          summary:'Success', 
          detail:`Product ${product.name} is created`
        })
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          })
      },
      () => {
        this.messageService.add({
          severity:'error', 
          summary:'Error', 
          detail:'Product is not created'
        })
      }
    )
  }

  private _updateProduct(productFormData: FormData) {
    this.productsService.updateProduct(productFormData, this.currentProductId).subscribe(
      () => {
        this.messageService.add({
          severity:'success', 
          summary:'Success', 
          detail:`Product is updated!`
        })
        timer(1000)
          .toPromise()
          .then(() => {
            this.location.back()
          })
      },
      () => {
        this.messageService.add({
          severity:'error', 
          summary:'Error', 
          detail:'Product is not updated'
        })
      }
    )
  }
  
  private _checkEditMode(){
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentProductId = params.id
        this.productsService.getOneProduct(params.id).subscribe( ( product:any ) => {
          this.productForm.name.setValue(product.data.name);
          this.productForm.category.setValue(product.data.category);
          this.productForm.brand.setValue(product.data.brand);
          this.productForm.price.setValue(product.data.price);
          this.productForm.countInStock.setValue(product.data.countInStock);
          this.productForm.isFeatured.setValue(product.data.isFeatured);
          this.productForm.description.setValue(product.data.description);
          this.productForm.richDescription.setValue(product.data.richDescription);
          this.imageDisplay = product.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();
        })
      }
    })
  }


  onSubmit() {
    this.isSubmitted = true
    if(this.form.invalid) return;
    
    const productFormData = new FormData()  // sending data as a form data NOT json
    
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value)
    })
    if(this.editmode) {
      this._updateProduct(productFormData)
    } else {
      this._addProduct(productFormData)
    }
  }
  
  onCancel() {
    this.location.back()
  }

  onImageUpload(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.form.patchValue({ image: file })   // patch value like add value
      this.form.get('image').updateValueAndValidity()

      const fileReader = new FileReader()
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result
      }
      fileReader.readAsDataURL(file)
    }
  }

  get productForm(){
    return this.form.controls;
  }

}

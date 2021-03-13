import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/categories.service';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-create-edit-category',
  templateUrl: './create-edit-category.component.html',
  styleUrls: ['./create-edit-category.component.css'],
})
export class CreateEditCategoryComponent implements OnInit {
  @Input() isEditMode?: boolean = true;
  @Input() category?: Category;
  @Output() saveCategory!: EventEmitter<Category>;
  @Output() updateCategory!: EventEmitter<Category>;
  url?: string;
  createCategoryForm!: FormGroup;
  categoryToEdit?: Category;
  categoryToEditChanged?: boolean;
  submitted!: boolean;
  showProgressBar!: boolean;
  categories: Category[] = [];
  nameExist!: boolean;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.saveCategory = new EventEmitter<Category>();
    this.updateCategory = new EventEmitter<Category>();
    this.categoryToEditChanged = true;
    this.showProgressBar = false;
    this.nameExist = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) =>
      this.categoryService.getCategory(params.id).subscribe((value) => {
        this.categoryToEdit = value;
        this.updateForm();
      })
    );
    this.categoryService
      .getCategories()
      .subscribe((categories: Category[]) => (this.categories = categories));
    this.initForm();
    this.createCategoryForm.valueChanges.subscribe((newCategory: Category) => {
      const { name } = newCategory;
      if (
        this.categories.find(
          (category: Category) =>
            category.name === this.createCategoryForm.controls.name?.value
        )
      ) {
        this.nameExist = true;
      } else {
        this.nameExist = false;
        this.categoryToEditChanged = name === this.categoryToEdit?.name;
      }
    });
  }

  deleteUrl(): void {
    this.url = '';
    this.createCategoryForm.controls.imageUrl?.setValue(undefined);
  }

  onSubmit(): void {
    this.showProgressBar = true;
    const category: Category = {
      _id: this.categoryToEdit?._id,
      name: this.createCategoryForm.controls.name?.value,
    };
    if (!this.nameExist) {
      this.categoryToEdit
        ? this.categoryService.updateCategory(category)
        : this.categoryService.saveCategory(category);
      this.createCategoryForm.reset();
      this.deleteUrl();
    }
  }

  private initForm(): void {
    this.createCategoryForm = this.fb.group({
      name: new FormControl(
        this.categoryToEdit ? this.categoryToEdit.name : '',
        [Validators.required, Validators.minLength(3)]
      ),
    });
  }

  updateForm(): void {
    const updatedFormValue: any = {
      name: this.categoryToEdit?.name,
    };
    this.createCategoryForm.patchValue(updatedFormValue);
  }
}

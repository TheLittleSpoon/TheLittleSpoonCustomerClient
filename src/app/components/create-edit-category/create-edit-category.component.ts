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
  categories!: Category[];
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
    this.route.params.subscribe((params) => {
      this.categoryToEdit = this.categoryService.getCategory(params.id);
    });
    this.categoryService
      .getCategories()
      .subscribe((categories: Category[]) => (this.categories = categories));
    this.initForm();
    this.createCategoryForm.valueChanges.subscribe((newCategory: Category) => {
      const { name, imageUrl } = newCategory;
      if (
        this.categories.find(
          (category: Category) =>
            category.name == this.createCategoryForm.controls.name?.value
        )
      ) {
        this.nameExist = true;
      } else {
        this.nameExist = false;
        this.categoryToEditChanged =
          name == this.categoryToEdit?.name &&
          imageUrl == this.categoryToEdit?.imageUrl;
      }
      this.url = imageUrl;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  deleteUrl(): void {
    this.url = '';
    this.createCategoryForm.controls.imageUrl?.setValue(undefined);
  }

  onSubmit(): void {
    this.showProgressBar = true;
    const category: Category = {
      name: this.createCategoryForm.controls.name?.value,
      imageUrl: this.url,
    };
    if (!this.nameExist) {
      this.categoryToEdit
        ? this.categoryService.updateCategory(category)
        : this.categoryService.saveCategory(category);
      this.categoryService.saveCategory(category);
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
      imageUrl: new FormControl(
        this.categoryToEdit ? this.categoryToEdit.imageUrl : '',
        [Validators.required]
      ),
    });
    this.categoryToEdit ? (this.url = this.categoryToEdit.imageUrl) : '';
  }
}

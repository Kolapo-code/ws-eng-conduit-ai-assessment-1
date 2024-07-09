import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions, LocalStorageJwtService, selectLoggedIn, selectUser } from '@realworld/auth/data-access';
import { filter, take } from 'rxjs/operators';
import { ArticleService } from './article.service'; // Ensure this path is correct
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'cdt-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FooterComponent, NavbarComponent, RouterModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  user$ = this.store.select(selectUser);
  isLoggedIn$ = this.store.select(selectLoggedIn);
  articleForm: FormGroup;

  constructor(
    private readonly store: Store,
    private readonly localStorageJwtService: LocalStorageJwtService,
    private fb: FormBuilder,
    private articleService: ArticleService
  ) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
      tags: ['']
    });
  }

  ngOnInit() {
    this.localStorageJwtService
      .getItem()
      .pipe(
        take(1),
        filter((token) => !!token),
      )
      .subscribe(() => this.store.dispatch(authActions.getUser()));
  }

  createArticle() {
    if (this.articleForm.valid) {
      const formValue = this.articleForm.value;
      const articleData = {
        title: formValue.title,
        description: formValue.description,
        body: formValue.body,
        tagList: formValue.tags.split(',').map((tag: string) => tag.trim())
      };
      this.articleService.createArticle(articleData).subscribe({
        next: (response: any) => {
          console.log('Article created successfully', response);
          // Handle successful article creation here
        },
        error: (error: any) => {
          console.error('Error creating article', error);
          // Handle error here
        }
      });
    }
  }
}


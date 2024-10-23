import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuBarComponent } from '../../../../shared/components/menu-bar/menu-bar.component';
import { ContainerComponent } from '../../../../shared/components/container/container/container.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { toastAlert } from '../../../../core/utils/alerts.utils';
import { CreatePostsInterface, PostsInterface } from '../../../../core/interfaces/posts.interfaces';
import { PostsService } from '../../services/posts/posts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TiposModalEnum } from '../../../../core/enums/tiposModal.enum';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [
    CommonModule,
    MenuBarComponent,
    ContainerComponent,
    InputTextModule,
    CardModule,
    FloatLabelModule,
    ButtonModule,
    InputTextareaModule,
    ReactiveFormsModule,
    DropdownModule
  ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent implements OnInit,OnChanges,OnDestroy {
  form: FormGroup;
  @Output() eventEmitter: EventEmitter<string> = new EventEmitter();
  @Input() tipo?: string;
  @Input() datosEditar?: any;
  usuarios:Array<number> = Array.from({length: 11}, (e, i)=> i)

  tipos = {
    crear:TiposModalEnum.CREAR,
    editar:TiposModalEnum.EDITAR
  }

  constructor(
    private _formbuilder: FormBuilder,
    private postService: PostsService
  ) {
    console.log(this.datosEditar)
    this.form = this._formbuilder.group({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
      userId: new FormControl(1, [Validators.required]),
      id: new FormControl(0, [Validators.required]),
    });
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
      this.form.reset()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datosEditar'] && this.tipo === TiposModalEnum.EDITAR) {
      this.setFormValues();
    }
  }

  setFormValues(): void {
    if (this.datosEditar) {
      this.form.controls['title'].setValue(this.datosEditar.title);
      this.form.controls['body'].setValue(this.datosEditar.body);
      this.form.controls['userId'].setValue(this.datosEditar.userId);
      this.form.controls['id'].setValue(this.datosEditar.id);
    }
  }

  createPost() {
    if (this.form.invalid) {
      toastAlert('Se deben llenar los campos obligatoriamente', 'warning');
    }

    let postData: CreatePostsInterface = {
      title: this.form.controls['title'].value,
      body: this.form.controls['body'].value,
      userId: this.form.controls['userId'].value,
    };

    this.postService.createPost(postData).subscribe({
      next: (res) => {
        if (res.id) {
          this.eventEmitter.emit('close');
          toastAlert(`Post ${postData.title} creado`, 'success');
          this.form.reset();
        }
      },
      error: (err: HttpErrorResponse) => {
        this.eventEmitter.emit('close');
        toastAlert(err.error.error, 'error');
      },
    });
  }

  updatePost() {
    if (this.form.invalid) {
      toastAlert('Se deben llenar los campos obligatoriamente', 'warning');
    }

    let postData: PostsInterface = {
      id: this.form.controls['id'].value,
      title: this.form.controls['title'].value,
      body: this.form.controls['body'].value,
      userId: this.form.controls['userId'].value
    };

    this.postService.updatePost(postData).subscribe({
      next: (res) => {
        if (res.id) {
          this.eventEmitter.emit('close');
          toastAlert(`Post ${postData.title} actualizado`, 'success');
          this.form.reset();
        }
      },
      error: (err: HttpErrorResponse) => {
        this.eventEmitter.emit('close');
        toastAlert(err.error.error, 'error');
      },
    });
  }

  submit() {
    this.tipo === TiposModalEnum.CREAR ? this.createPost() : this.updatePost();
  }
}

import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@redux/state.models';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {
  selectAllUsers,
} from '@redux/selectors/users.selectors';
import { IUser } from '@shared/models/user.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface NewTaskFormData {
  title: string,
  description: string,
  users: string[],
}

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  @ViewChild('memberCtrl') memberCtrl!: ElementRef<HTMLInputElement>;

  public allUsers$: Observable<IUser[]> = this.store$.select(selectAllUsers);

  public createTaskForm!: FormGroup;

  public separatorKeysCodes: number[] = [ENTER, COMMA];

  public selectedUsers: string[] = [];

  public formData!: NewTaskFormData;

  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: NewTaskFormData,
  ) { }

  ngOnInit(): void {
    this.createTaskForm = this.formBuilder.group({
      title: [this.data ? this.data.title : '', [Validators.required]],
      description: [this.data ? this.data.description : '', [Validators.required]],
      users: [''],
    });

    if (this.data) {
      this.formData = { ...this.data };

      if (this.data.users.length > 0) {
        this.selectedUsers = [...this.data.users];
      }
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedUsers.push(value);
    }
    event.chipInput!.clear();

    this.createTaskForm.controls['users'].setValue(null);

    this.update();
  }

  remove(user: string): void {
    const index = this.selectedUsers.indexOf(user);

    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
    }

    this.update();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.selectedUsers.indexOf(event.option.viewValue) === -1) {
      this.selectedUsers.push(event.option.viewValue);
    }
    this.memberCtrl.nativeElement.value = '';
    this.createTaskForm.controls['users'].setValue(null);
    this.update();

  }

  update() {
    this.formData = {
      ...this.createTaskForm.value,
      users: this.selectedUsers,
    };
  }
}

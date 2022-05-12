import {
  Component,
  ElementRef,
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
  @ViewChild('memberCtrl')
    memberCtrl!: ElementRef<HTMLInputElement>;

  public allUsers$: Observable<IUser[]> = this.store$.select(selectAllUsers);

  public createTaskForm!: FormGroup;

  public separatorKeysCodes: number[] = [ENTER, COMMA];

  public selectedUsers: string[] = ['lena'];

  public formData!: NewTaskFormData;

  constructor(
    private store$: Store<AppState>,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.createTaskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      users: [''],
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.selectedUsers.push(value);
    }
    event.chipInput!.clear();

    this.createTaskForm.controls['users'].setValue(null);
  }

  remove(user: string): void {
    const index = this.selectedUsers.indexOf(user);

    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (this.selectedUsers.indexOf(event.option.viewValue) === -1) {
      this.selectedUsers.push(event.option.viewValue);
    }
    this.memberCtrl.nativeElement.value = '';
    this.createTaskForm.controls['users'].setValue(null);
  }

  update() {
    this.formData = {
      ...this.createTaskForm.value,
      users: this.selectedUsers,
    };
  }
}

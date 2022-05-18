import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  @Input() trigger!: Observable<boolean>;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.trigger.pipe(
      takeUntil(this.destroy$),
    ).subscribe((val) => {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', val ? 'none' : 'block');
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

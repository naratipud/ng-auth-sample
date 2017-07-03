import { Directive, TemplateRef, ViewContainerRef, Input, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Directive({ selector: '[appShowAuthed]' })
export class ShowAuthedDirective implements OnInit {
  private _condition: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated && this._condition || !isAuthenticated && !this._condition) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    );
  }

  @Input()
  set appShowAuthed(condition: boolean) {
    this._condition = condition;
  }
}

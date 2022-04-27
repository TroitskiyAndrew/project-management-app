import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  openLoginPage():void {
    this.router.navigate(['/user', 'login'])
  }

  openRegistrationPage():void {
    this.router.navigate(['/user', 'registration'])
  }

  openUserEditPage():void {
    this.router.navigate(['user', 'edit'])
  }

  toggleBoardModal = (): void => {
    console.log('toggleBoardModal');
  };
  
  logout = (): void => {
    console.log('logout');
  };
  
  changeAppLang = (event: MouseEvent): void => {
    const lang: string = (event.target as HTMLElement).id;
    console.log(`switch lang to ${lang}`);
  };

}

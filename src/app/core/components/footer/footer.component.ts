import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.randomLinks();
  }

  randomLinks = (): void => {
    const authorsContainer = document.querySelector(
      '.footer__block-authors',
    ) as HTMLElement;
    const elements = Array.from(authorsContainer.childNodes);
    const copyRight = elements[0];
    const authors = Array.from(authorsContainer.childNodes).slice(1);
    authors.sort(() => Math.random() - 0.5);
    authorsContainer.innerHTML = '';
    authorsContainer.append(copyRight, ...authors);
  };
}

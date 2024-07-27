import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;

  @Input()
  public alt!: string;

  public hasLoaded: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (!this.url) throw new Error('Property url is required.');
    if (!this.alt) throw new Error('Property alt is required.');
  }

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 500);
  }
}

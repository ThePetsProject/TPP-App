import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'tpp-app';
  loading = false;

  constructor(
    private loaderService: LoaderService,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.loaderService.httpProgress().subscribe((status: boolean) => {
      this.loading = status;
    });
  }
}

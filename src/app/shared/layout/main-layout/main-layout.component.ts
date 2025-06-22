import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, SidebarComponent, NavbarComponent, CommonModule],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit {
  isSidebarOpen = true;
  isMobile = false;

  ngOnInit() {
    this.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onResize(_?: Event) {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    const isMobileNow = window.innerWidth < 960;
    if (this.isMobile !== isMobileNow) {
      this.isMobile = isMobileNow;
      this.isSidebarOpen = !this.isMobile;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

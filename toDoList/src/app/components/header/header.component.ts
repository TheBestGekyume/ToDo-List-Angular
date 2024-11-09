import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentDate: Date = new Date();

  ngOnInit(): void {
    setInterval(() => {
      this.currentDate = new Date();
    }, 60000);
  }
}
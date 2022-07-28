import { Component, ViewChild } from '@angular/core';
import { TableService } from './table.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  id: String;
  userId: String;
  title: String;
  body: String;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-table';
  displayedColumns: string[] = ['id', 'userId', 'title', 'body'];
  datasource!: MatTableDataSource<UserData>;
  posts: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: TableService) {
    this.service.getData().subscribe((data) => {
      console.log(data);
      this.posts = data;
      this.datasource = new MatTableDataSource(this.posts);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }
}

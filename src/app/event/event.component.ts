import { Component, OnInit, AfterViewInit,  ViewChild} from '@angular/core';
import { EventService } from '../event.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<Object>();
  displayedColumns: string [] = ['title', 'link', 'address', 'location', 'date'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public eventSrv: EventService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    // Get events
    this.eventSrv.getEventsScrapper()
      .subscribe( (eventList: any) => {
        this.dataSource.data = eventList;
      });
  }

}

export interface Event {
  title: string;
  link: string;
  address: string;
  location: string;
  date: string;
}
import { Component, OnInit, AfterViewInit,  ViewChild} from '@angular/core';
import { EventService } from '../event.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, AfterViewInit {

  isLoading = false;
  dataSource = new MatTableDataSource<Object>();
  displayedColumns: string [] = ['title', 'link', 'address', 'location', 'date'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  markers: any[] = []
  center: google.maps.LatLng
  gMap: any;

  constructor(
    public eventSrv: EventService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.isLoading = true;

    // G Map
    this.center = new google.maps.LatLng(39.768197, -86.157136);

    // Get events
    this.eventSrv.getEventsScrapper()
      .subscribe( (eventList: any) => {
        this.dataSource.data = eventList;
        this.isLoading = false;
        // G Map
        this.addMarkers();        
      });
  }

  addMarkers() {
    this.dataSource.data.forEach((event: any) => {
      this.markers.push(
        {
          'position': {
            'lat': Number(event['lat']),
            'lng': Number(event['long']),
          },
          'label': {
            'color': 'black',
            'text': event.title,
          }
        }
      )
    })

  }

}

export interface Event {
  title: string;
  link: string;
  address: string;
  location: string;
  date: string;
}
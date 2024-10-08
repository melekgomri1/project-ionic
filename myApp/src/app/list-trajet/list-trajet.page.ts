import { Component, OnInit } from '@angular/core';
import { TrajetService } from '../trajet.service';

@Component({
  selector: 'app-list-trajet',
  templateUrl: './list-trajet.page.html',
  styleUrls: ['./list-trajet.page.scss'],
})
export class ListTrajetPage implements OnInit {
  trajets: any[]=[];
  constructor(private  trajetService: TrajetService) { }

  ngOnInit() {
    this.getallcontacts();
  }
  getallcontacts(){
  this.trajetService.getAlltrajet().subscribe(
    (data)=>{
   this.trajets=data;
   console.log('trajet',this.trajets);
    },
    (error)=>{
      console.log('error trajet',error);
    }
  );
  }

}

import { Component, OnInit } from '@angular/core';
import { RosterService } from './roster.service';

@Component({
  selector: 'app-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {
  roster: any[] = [];

  constructor(private rosterService: RosterService) {}

  ngOnInit(): void {
    this.rosterService.getRoster().subscribe({
      next: data => {
        this.roster = data;
      },
      error: err => {
        console.error('Error fetching roster data', err);
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { SerachService } from '../../services/serach.service'
@Component({
  selector: 'app-github-search',
  templateUrl: './github-search.component.html',
  styleUrls: ['./github-search.component.scss']
})
export class GithubSearchComponent implements OnInit {
  profile: any;
  repos: any[];
  username: any;
  display = false;
  constructor(private serachSer: SerachService,
    public activatedRoute: ActivatedRoute
  ) {
    this.repos = [];
    this.username = "";
  }
  state$: Observable<object>;
  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params['state']) {
      this.username = this.activatedRoute.snapshot.params['state'];
      this.findProfile();
    }
  }

  findProfile() {
    this.serachSer.updateProfile(this.username);
    this.serachSer.getProfileInfo().subscribe(
      successData => {
        this.profile = successData;
        this.createHistory(this.profile, 'success')
      },
      error => {
        this.profile = [];
        this.createHistory("", 'danger')
      },
      () => {

      }
    );

  }
  viewProfile(profile: any) {
    this.display = true;
  }
  createHistory(profile: any, status: any) {
    let todo = {
      id: profile.id ? profile.id : Math.floor(Math.random()),
      name: this.username ? this.username : '-',
      status: status
    }
    this.serachSer.create(todo).subscribe((response) => {
    });
  }

}

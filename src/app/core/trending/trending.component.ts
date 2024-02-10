import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IHashTags } from 'src/app/shared/Interfaces/IHashTags';
import { IUsersInterface } from 'src/app/shared/Interfaces/IUsersInterface';
import { FireStoreCollectionsServiceService } from 'src/app/shared/Services/fire-store-collections-service.service';
import { UserState } from 'src/app/shared/State/user.reducer';
import { selectDocId } from 'src/app/shared/State/user.selectors';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent {
  currentUserId!: string | null;
  trending:any[] = []
  hashtags: IHashTags[] | undefined;
  OriginalTrends: IHashTags[] | undefined;
  constructor(
    private fireStoreCollectionsService: FireStoreCollectionsServiceService,
    private router: Router,
    private store:Store<UserState>
  ) {}

  trendCount:number = 0;
  ngOnInit(): void {
   
    this.store.select(selectDocId).subscribe((id) => {
      this.currentUserId = id;
      console.log('Current user id:', this.currentUserId);
    });

    // this.fireStoreCollectionsService.getTrendingHashtags().subscribe((v)=>{
    //   console.warn(v)
    // })

    this.fireStoreCollectionsService
      .getAllTrendingHashtags()
      .subscribe((hashtags) => {
        console.warn("hastags right heereee",hashtags)
        this.hashtags = hashtags.sort((a, b) => b.count - a.count);
        this.OriginalTrends = hashtags.sort((a, b) => b.count - a.count);
      });
  }

  ViewTrendingDetails(trendTag:string){
    this.router.navigate(['/', 'all-posts'], {
      queryParams: {
        hashtag: trendTag
      },
    });
  }

  search(val: string) {
    this.hashtags = this.fetchTrendingByTextSearch(val.toLocaleLowerCase())
  }

  fetchTrendingByTextSearch(
    searchTerm: string = ""
  ): IHashTags[] | undefined {
    let filteredTrends = this.hashtags;
    // Apply additional filtering based on the search term
    if (searchTerm.trim() !== "") {
      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
      filteredTrends = filteredTrends?.filter((user) =>
        user.hashtag.toLowerCase().includes(lowerCaseSearchTerm)
      );
    } else {
      filteredTrends = this.OriginalTrends;
    }

    return filteredTrends;
  }
}

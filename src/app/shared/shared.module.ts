import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './app-header/app-header.component';
import { StoryContainerComponent } from './story-container/story-container.component';
import { PostItemComponent } from './post-item/post-item.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { ModalComponent } from './modal/modal.component';
import { TabsComponent } from './tabs/tabs.component';
import { SearchComponent } from './search/search.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { PostListComponent } from './post-list/post-list.component';
import { CommentBoxComponent } from './comment-box/comment-box.component';
import { NewsCardComponent } from './news-card/news-card.component';
import { NewFriendCardComponent } from './new-friend-card/new-friend-card.component';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { DialogComponent } from './dialog/dialog.component';
import { ImagesGridComponent } from './images-grid/images-grid.component';
// import { StoryCubeComponent } from './story-cube/story-cube.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './State/user.reducer';
import { NoPostsFoundComponent } from './no-posts-found/no-posts-found.component';
import { TimestampToDatePipe } from './timestamp-to-date.pipe';
import { StorageModule } from '@angular/fire/storage';
import { ToastrModule } from 'ngx-toastr';
import { AlertService } from './Services/alert.service';
import { StoriesViewerComponent } from './stories-viewer/stories-viewer.component';
import { GalleryItemComponent } from './gallery-item/gallery-item.component';
import { PromotedTabsComponent } from './promoted-tabs/promoted-tabs.component';
import { PromoItemComponent } from './promo-item/promo-item.component';
import { AngularFireMessaging, AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { HttpClientModule } from '@angular/common/http';
import { UsersCardComponent } from './users-card/users-card.component';
import { PostItemV2Component } from './post-item-v2/post-item-v2.component';
import { AppointmentDialogComponent } from './appointment-dialog/appointment-dialog.component';
import { DoctorUserItemComponent } from './doctor-user-item/doctor-user-item.component';
import { TowTruckUserItemComponent } from './tow-truck-user-item/tow-truck-user-item.component';
import { PeriodTrackerComponent } from './period-tracker/period-tracker.component';

@NgModule({
  declarations: [
    AppHeaderComponent,
    StoryContainerComponent,
    PostItemComponent,
    RecommendationsComponent,
    ModalComponent,
    TabsComponent,
    SearchComponent,
    ChatListComponent,
    PostListComponent,
    CommentBoxComponent,
    NewsCardComponent,
    NewFriendCardComponent,
    FloatingButtonComponent,
    DialogComponent,
    ImagesGridComponent,
    // StoryCubeComponent,
    NoPostsFoundComponent,
    TimestampToDatePipe,
    GalleryItemComponent,
    StoriesViewerComponent,
    PromotedTabsComponent,
    PromoItemComponent,
    UsersCardComponent,
    PostItemV2Component,
    AppointmentDialogComponent,
    DoctorUserItemComponent,
    TowTruckUserItemComponent,
    PeriodTrackerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature("user", userReducer),
    StorageModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-top-right",
      preventDuplicates: true,
      closeButton: true,
      toastClass: "custom-toast",
    }),
    HttpClientModule,
  ],
  exports: [
    AppHeaderComponent,
    StoryContainerComponent,
    PostItemComponent,
    RecommendationsComponent,
    ModalComponent,
    TabsComponent,
    SearchComponent,
    ChatListComponent,
    PostListComponent,
    NewsCardComponent,
    NewFriendCardComponent,
    FloatingButtonComponent,
    DialogComponent,
    ImagesGridComponent,
    NoPostsFoundComponent,
    TimestampToDatePipe,
    GalleryItemComponent,
    StoriesViewerComponent,
    PromotedTabsComponent,
    PromoItemComponent,
    UsersCardComponent,
    PostItemV2Component,
    AppointmentDialogComponent,
    DoctorUserItemComponent,
    TowTruckUserItemComponent,
    PeriodTrackerComponent
  ],
  providers: [AlertService],
})
export class SharedModule {}

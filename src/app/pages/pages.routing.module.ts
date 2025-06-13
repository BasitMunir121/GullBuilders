import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LiveAuctionComponent } from './live-auction/live-auction.component';
import { ProductsComponent } from './products/products.component';
import { ContentComponent } from './content/content.component';
import { LiveComponent } from './live-auction/live/live.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
  },
  {
    path: 'auction',
    component: LiveAuctionComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'content',
    component: ContentComponent,
  },
  {
    path: 'live/:id',
    component: LiveComponent,
  },
];

import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
interface features {
  id: number;
  icon: string;
  title: string;
  subtext: string;
  subtextMore?: string;
  color: string;
}

@Component({
  selector: 'app-starter',
  standalone: true,
  imports:[MaterialModule,TablerIconsModule],
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent {
  features: features[] = [
    {
      id: 1,
      icon: 'wand',
      title: 'Live Auctions',
      color: 'primary',
      subtext:
        'Buy and sell in real-time with our innovative auction system. Chat directly with buyers or sellers to negotiate prices and finalize deals.',
    },
    {
      id: 2,
      icon: 'adjustments',
      title: 'Transparent Product Listings',
      color: 'accent',
      subtext:
        'Each product is assigned a unique QR code linked to detailed farmer profiles, certifications, & production methods.',
    },
    {
      id: 3,
      icon: 'archive',
      title: 'Educational Resources',
      color: 'warning',
      subtext: 'Access our knowledge hub filled guides, and FAQs on sustainable farming. Learn in your preferred language with region-specific insights.',
    },
    {
      id: 4,
      icon: 'clock',
      title: 'Real-Time Notifications',
      color: 'error',
      subtext: 'Stay ahead with push notifications for',
      subtextMore: '1:Crop advisories 2:Market updates 3:Weather forecasts.',
    },
    {
      id: 5,
      icon: 'tag',
      title: 'Feedback System ',
      color: 'success',
      subtext: 'Build trust with reviews. Farmers can review buyers, and buyers can leave feedback on products, creating a reliable marketplace.',
    },
    {
      id: 9,
      icon: 'chart-pie',
      title: 'Offline Functionality',
      color: 'error',
      subtext: 'No internet? No problem. View educational content and product listings offline. Your data syncs automatically when you’re back online.',
    },
  ];
}

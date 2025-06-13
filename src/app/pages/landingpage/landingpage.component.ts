import { Component, Output, EventEmitter, Input, ViewChild, TemplateRef } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { ViewportScroller } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

interface blogPosts {
  id: number;
  imgSrc: string;
  title: string;
  data1: string;
  data2: string;
  data3: string;
}
interface apps {
  id: number;
  img: string;
  title: string;
  subtitle: string;
  link: string;
}

interface quicklinks {
  id: number;
  title: string;
  link: string;
}

interface demos {
  id: number;
  name: string;
  subtext?: string;
  url: string;
  imgSrc: string;
}

interface testimonials {
  id: number;
  name: string;
  subtext: string;
  imgSrc: string;
}

interface features {
  id: number;
  icon: string;
  title: string;
  subtext: string;
  subtextMore?: string;
  color: string;
}
interface quicklinks {
  id: number;
  title: string;
  link: string;
}


@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: [],
})
export class AppLandingpageComponent {
  @Input() showToggle = true;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();


  options: any;
  constructor(
    private settings: CoreService,
    private scroller: ViewportScroller,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {
    this.options = this.settings.getOptions();
    this.quoteFormGroup = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      service: ['', Validators.required],
      location: [''],
      details: ['']
    });
    // Custom request form initialization (add all controls)
    this.customRequestForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      siteLocation: [''],
      constructionType: [''],
      area: [''],
      description: ['', Validators.required]
      // Add more controls here if you add more fields in the HTML
    });
    // WhatsApp QR code (replace with your WhatsApp number)
    this.qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https://wa.me/923355862952';
  }

  // scroll to demos
  gotoDemos() {
    this.scroller.scrollToAnchor('demos');
  }
  blogPosts: blogPosts[] = [
    {
      id: 1,
      imgSrc: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80', // Homeowners: modern house under construction
      title: 'For Homeowners',
      data1: 'Easily request quotes for your construction or renovation projects.',
      data2: 'Browse portfolios and reviews of trusted contractors.',
      data3: 'Access tips and guides for planning and managing your construction work.'
    },
    {
      id: 2,
      imgSrc: 'https://images.unsplash.com/photo-1523413363574-c30aa1c2a516?auto=format&fit=crop&w=600&q=80', // Contractors: builder on construction site
      title: 'For Contractors',
      data1: 'Showcase your completed projects with high-quality images and details.',
      data2: 'Connect with potential clients and respond to quote requests.',
      data3: 'Stay updated with the latest construction trends and safety standards.'
    },
    {
      id: 3,
      imgSrc: 'https://images.unsplash.com/photo-1683821791876-9d2ad0c90bf6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Suppliers: construction materials and tools
      title: 'For Suppliers',
      data1: 'List your construction materials and tools for contractors and homeowners.',
      data2: 'Promote special offers and bulk discounts.',
      data3: 'Reach a wider audience through our marketplace platform.'
    },
  ];
  notificationsData = [
    {
      id: 1,
      advisory_id: 101,
      title: 'System Update',
      content: 'The system will undergo maintenance on 2025-02-01.',
    },
    {
      id: 2,
      advisory_id: 102,
      title: 'Policy Change',
      content: 'New policies will be effective from 2025-02-10.',
    },
    {
      id: 3,
      advisory_id: 103,
      title: 'Service Alert',
      content: 'Some services may be unavailable on 2025-02-15.',
    },
  ];
  educationalContentData = [
    {
      id: 1,
      advisory_id: 101,
      title: 'Introduction to Angular',
      content: 'This course covers the basics of Angular framework.',
    },
    {
      id: 2,
      advisory_id: 102,
      title: 'JavaScript Basics',
      content: 'Learn the fundamentals of JavaScript programming.',
    },
    {
      id: 3,
      advisory_id: 103,
      title: 'Web Development',
      content: 'Comprehensive guide to becoming a full-stack developer.',
    },
  ];
  features: features[] = [
    {
      id: 1,
      icon: 'plumbing',
      title: 'Plumbing',
      color: 'primary',
      subtext: 'Professional plumbing services for installation, repair, and maintenance of water systems.',
    },
    {
      id: 2,
      icon: 'grid_on',
      title: 'Tiles',
      color: 'accent',
      subtext: 'Expert tile installation and renovation for floors, walls, and bathrooms.',
    },
    {
      id: 3,
      icon: 'home_repair_service',
      title: 'Renovation',
      color: 'warning',
      subtext: 'Complete renovation solutions for homes and offices, including design and execution.',
    },
    {
      id: 4,
      icon: 'construction',
      title: 'Construction',
      color: 'success',
      subtext: 'End-to-end construction services for residential and commercial projects.',
    },
    {
      id: 5,
      icon: 'roofing',
      title: 'Roofing',
      color: 'error',
      subtext: `Durable and reliable roofing installation and repairs, including waterproofing, leak detection etc.`,
    },
    {
      id: 6,
      icon: 'electrical_services',
      title: 'Electrical',
      color: 'secondary',
      subtext: 'Certified electrical installation, repair, and maintenance services.',
    },
  ];
  constructionServices = [
    { name: 'Tiles', icon: 'grid_on' },
    { name: 'Plumbing', icon: 'plumbing' },
    { name: 'Renovation', icon: 'home_repair_service' },
    { name: 'Construction', icon: 'construction' },
    { name: 'Roofing', icon: 'roofing' },
    { name: 'Electrical', icon: 'electrical_services' },
    { name: 'Painting', icon: 'format_paint' },
    { name: 'Carpentry', icon: 'carpenter' },
    { name: 'Flooring', icon: 'layers' },
    { name: 'Waterproofing', icon: 'water_drop' },
    { name: 'Masonry', icon: 'foundation' }
  ];
  quoteFormGroup: FormGroup;
  customRequestForm: FormGroup;
  selectedFiles: File[] = [];
  qrCodeUrl: string;

  selectedLocation: string = '';

  @ViewChild('quoteForm') quoteFormTemplate: TemplateRef<any>;

  detectLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          // Use a geocoding API to convert lat/lng to city if needed
          this.selectedLocation = 'Detected Location';
        },
        err => {
          alert('Unable to detect location.');
        }
      );
    }
  }

  openQuoteForm() {
    this.dialog.open(this.quoteFormTemplate, {
      width: '400px'
    });
  }

  submitQuote() {
    if (this.quoteFormGroup.valid) {
      // Handle quote submission (API call or email)
      alert('Quote request submitted!');
      this.dialog.closeAll();
      this.quoteFormGroup.reset();
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  submitCustomRequest() {
    if (this.customRequestForm.valid) {
      const formValues = this.customRequestForm.value;
      let message = `Custom Project Request:%0A` +
        `Name: ${formValues.name}%0A` +
        `Contact: ${formValues.contact}%0A` +
        `Site Location: ${formValues.siteLocation || ''}%0A` +
        `Construction Type: ${formValues.constructionType || ''}%0A` +
        `Area: ${formValues.area || ''}%0A` +
        `Description: ${formValues.description}`;
      // WhatsApp API (replace with your WhatsApp number)
      let whatsappUrl = `https://wa.me/923355862952?text=${message}`;
      window.open(whatsappUrl, '_blank');
      // Optionally, send via email fallback
      // let mailto = `mailto:your@email.com?subject=Custom Project Request&body=${message}`;
      // window.open(mailto, '_blank');
      this.customRequestForm.reset();
      this.selectedFiles = [];
    }
  }
}

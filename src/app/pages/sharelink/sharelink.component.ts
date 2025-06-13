import { Component, Inject } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { NotifyService } from 'src/app/services/core/toast.service';
import { CrossbuttonComponent } from "../crossbutton/crossbutton.component";

@Component({
  selector: 'app-sharelink',
  standalone: true,
  imports: [
    TablerIconsModule,
    MaterialModule, CommonModule,
    CrossbuttonComponent
],
  templateUrl: './sharelink.component.html',
  styleUrl: './sharelink.component.scss'
})
export class SharelinkComponent {
  isBranded: boolean = false;
  organizationSubDomain: string | null = null;
  constructor(
    private _notifyService: NotifyService,
    @Inject(MAT_DIALOG_DATA) public data: { URLPath: string , isBranded: boolean, OrganizationSubDomain: string }
  ) {
    if (data && data.isBranded) {
      this.isBranded=data.isBranded;
      this.organizationSubDomain=data.OrganizationSubDomain;
    }
  }

  copyUrl(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this._notifyService.showToast('Direct link copied: ' + val);
  }

  shareOnWhatsApp() {
    var message = `3u.gg/${this.data.URLPath}`;
    if(this.isBranded){
      message=`${this.organizationSubDomain}.3u.gg/${this.data.URLPath}`
    }
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  // Method to share on Facebook
  shareOnFacebook() {
    var facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://3u.gg/' + this.data.URLPath)}`;
    if(this.isBranded){
      facebookUrl=`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://'+this.organizationSubDomain+'.3u.gg/' + this.data.URLPath)}`;
    }
    window.open(facebookUrl, '_blank');
  }
    // Method to share on LinkedIn
    shareOnLinkedIn() {
      var linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://3u.gg/' + this.data.URLPath)}`;
      if(this.isBranded){
        linkedInUrl=`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://'+this.organizationSubDomain+'.3u.gg/' + this.data.URLPath)}`
      }
      window.open(linkedInUrl, '_blank');
    }
  
    // Method to share on Twitter
    shareOnTwitter() {
      var message = `https://3u.gg/${this.data.URLPath}`;
      if(this.isBranded){
        message=`https://${this.organizationSubDomain}.3u.gg/${this.data.URLPath}`
      }
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
      window.open(twitterUrl, '_blank');
    }

    // Method to share via Email
    shareViaEmail() {
      const subject = '';
      var body = `https://3u.gg/${this.data.URLPath}`;
      if(this.isBranded){
        body=`https://${this.organizationSubDomain}.3u.gg/${this.data.URLPath}`
      }
      const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoUrl, '_self');
    }
}

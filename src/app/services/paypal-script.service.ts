import { Injectable } from '@angular/core';
//import { PaypalAuth } from '../../../plans'
import { ConfigurationService } from '../common/config.service';

@Injectable({
  providedIn: 'root'
})
export class PayPalScriptService {
  PaypalAuth= ConfigurationService.getConfig().PaypalAuth;
  private scriptLoaded = false;
  private scriptElement: HTMLScriptElement | null = null;

  constructor() { }

  loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.scriptLoaded) {
        resolve(); // Script is already loaded, resolve immediately
        return;
      }

      this.scriptElement = document.createElement('script');
      this.scriptElement.src = `https://www.paypal.com/sdk/js?client-id=${this.PaypalAuth.ClientId}&vault=true&intent=subscription`;
      this.scriptElement.setAttribute('data-sdk-integration-source', 'button-factory');
      this.scriptElement.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };
      this.scriptElement.onerror = reject;
      document.body.appendChild(this.scriptElement);
    });
  }
  loadScript2(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.scriptLoaded) {
        resolve(); // Script is already loaded, resolve immediately
        return;
      }

      this.scriptElement = document.createElement('script');
      this.scriptElement.src = `https://www.paypal.com/sdk/js?client-id=${this.PaypalAuth.ClientId}`;
      this.scriptElement.setAttribute('data-sdk-integration-source', 'button-factory');
      this.scriptElement.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };
      this.scriptElement.onerror = reject;
      document.body.appendChild(this.scriptElement);
    });
  }
  unloadScript(): Promise<void>{
    return new Promise((resolve, reject) => {
    if (this.scriptElement) {
      document.body.removeChild(this.scriptElement);
      this.scriptElement = null;
      this.scriptLoaded = false;
    }
     resolve();
  });
  }
  
}

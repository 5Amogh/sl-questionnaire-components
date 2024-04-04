import { Injectable } from '@angular/core';
import { SuiModalService } from '@project-sunbird/ng2-semantic-ui';
import { Observable } from 'rxjs';
import { AlertMeta } from '../interfaces/alert.type';

export abstract class SlUtilsAbstract {
  abstract openAlert?(data): Promise<any>;

  abstract error?(msg);

  abstract getPreSingedUrls?(payload): Observable<any>;

  abstract cloudStorageUpload?(payload): Observable<any>;
}

@Injectable({
  providedIn: 'root',
})
export abstract class SlUtilsService extends SlUtilsAbstract {
  constructor(public modalService: SuiModalService) {
    super();
  }

  /**
   * @param {AlertMeta}  meta: Alert Meta Form Object
   * @param {String} meta.title Optional ! Display title of alert fields
   * @param {String}  meta.size Provide size of alert.('tiny','mini)
   * @param {AlertBodyType}  meta.bodyType Alert-content type to show in alert body
   * @param {String}  meta.data content to show
   * @param {String}  meta.buttonClass class to apply on button div
   * @param {String}  meta.acceptText text to show in accept button
   * @param {String}  meta.cancelText text to show in accept button
   * @param {String}  meta.type Optional ! To set type of alert
   * @param {Boolean}  meta.closeIcon Optional ! Show top right close icon , default = false
   */
  alert(meta: AlertMeta) {
    const button = [];
    meta.acceptText &&
      button.push({
        type: 'accept',
        returnValue: true,
        buttonText: meta.acceptText,
      });
    meta.cancelText &&
      button.push({
        type: 'cancel',
        returnValue: false,
        buttonText: meta.cancelText,
      });

    let alertMeta = {
      type: meta.type,
      size: meta.size,
      isClosed: meta.closeIcon,
      content: {
        title: meta.title,
        body: {
          type: meta.bodyType,
          data: meta.data,
        },
      },
      footer: {
        className: meta.buttonClass,
        buttons: button,
      },
    };

    return this.openAlert(alertMeta);
  }
}

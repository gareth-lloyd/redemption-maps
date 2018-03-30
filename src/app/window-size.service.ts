import { EventManager } from '@angular/platform-browser';
import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

enum Layout {
  Mobile = 'mobile',
  Desktop = 'desktop'
}

function getWindow (): any {
  return window;
}

@Injectable()
class WindowSizeService {
  public windowSize: BehaviorSubject<number>;
  public layout: BehaviorSubject<Layout>;

  constructor(private eventManager: EventManager) {
    this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));

    let size: number = this.nativeWindow.innerWidth;
    this.windowSize = new BehaviorSubject<number>(size);
    this.layout = new BehaviorSubject<Layout>(this.getLayout(size));
  }

  private onResize(event: any) {
    let size = event.currentTarget.innerWidth;
    this.windowSize.next(size);
    this.layout.next(this.getLayout(size));
  }

  getLayout(size: number): Layout {
    return (size < 500) ? Layout.Mobile : Layout.Desktop;
  }

  get nativeWindow (): any {
    return getWindow();
  }

}

export { Layout, WindowSizeService };

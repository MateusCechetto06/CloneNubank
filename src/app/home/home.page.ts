import { Component, Renderer2, ViewChild } from '@angular/core';
import { AnimationController, Animation, Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('blocks') block: any;
  @ViewChild('background') background: any;
  public options: Array<any> = [
    { icon: 'person-add-outline', text: 'Indicar amigos' },
    { icon: 'phone-portrait-outline', text: 'Recarda do celular' },
    { icon: 'wallet-outline', text: 'Depositar' },
    { icon: 'options-outline', text: 'Ajustar limite' },
    { icon: 'help-circle-outline', text: 'Me ajuda' },
    { icon: 'barcode-outline', text: 'Pagar' },
    { icon: 'lock-open-outline', text: 'Bloquear cartão' },
    { icon: 'card-outline', text: 'Cartão virtual' },

  ];
  public slidesOptions: any = { slidesPerView: 3, freeMode: true }

  public items: Array<any> = [
    { icon: 'help-circle-outline', text: 'Me ajuda' },
    { icon: 'person-add-outline', text: 'Perfil' },
    { icon: 'cash-outline', text: 'Configurar conta' },
    { icon: 'card-outline', text: 'Configurar cartão' },
    { icon: 'phone-portrait-outline', text: 'Configurações do app' },
  ];

  public initialStep: number = 0;
  private maxTranslate: number;
  private animation: Animation;
  ;


  constructor
    (private animationCtrl: AnimationController,
      private plataform: Platform,
      private renderer: Renderer2,
    ) {
    this.maxTranslate = this.plataform.height() - 200;
  }

  ngAfterViewInit(){
    this.createAnimation();
  }

  toggleBlocks() {
    this.initialStep = this.initialStep === 0 ? this.maxTranslate : 0;

    this.animation.direction(this.initialStep === 0 ? 'reverse' : 'normal').play();
  }

  createAnimation() {
    this.animation = this.animationCtrl.create()
    .addElement(this.block.nativeElement)
    .duration(300)
    .fromTo('transform', 'translateY(0)', `translateY(${this.maxTranslate}px)`);
    this.setBackgroundOpacity();

  }

  setBackgroundOpacity() {
   this.renderer.setStyle(this.background.nativeElement, 'opacity', this.initialStep === 0 ? '0' : '1');
  }

  fixedBlocks(): Boolean {
    return this.initialStep === this.maxTranslate;
  }
}

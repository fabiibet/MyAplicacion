import { Component } from '@angular/core';
import { AlertController, NavController, createAnimation } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { Animation } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private animation: Animation = createAnimation('');
  usuario: string = '';
  nombre: string = '';
  apellido: string = '';
  nivelEducacion: string = '';
  fechaNacimiento: string = '';

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private navCtrl: NavController,
    private animationCtrl: AnimationController
  ) {
    this.route.queryParams.subscribe((params) => {
      if (params && 'usuario' in params) {
        this.usuario = params['usuario'];
      }
    });
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacion = '';
    this.fechaNacimiento = '';

    this.animateInputFields();
  }

  animateInputFields() {
    const inputNombre = document.querySelector('.nombre input') as HTMLElement;
    const inputApellido = document.querySelector('.apellido input') as HTMLElement;

    if (inputNombre && inputApellido) {
      const animation = this.animationCtrl.create()
        .addElement(inputNombre)
        .addElement(inputApellido)
        .duration(1000)
        .iterations(1)
        .fromTo('transform', 'translateX(0)', 'translateX(100%)')
        .play();
    }
  }

  async mostrarInformacion() {
    const alert = await this.alertController.create({
      header: 'Usuario',
      message: `Su nombre es ${this.nombre} ${this.apellido}`,
      buttons: ['Yes'],
    });

    await alert.present();
  }

  cerrarSesion() {
    this.navCtrl.navigateBack('/login');
  }

  applyTitleAnimation() {
    const title = document.querySelector('#animacion') as HTMLElement;

    if (title) {
      this.animation = this.animationCtrl
        .create()
        .addElement(title)
        .duration(2500)
        .iterations(Infinity)
        .keyframes([
          { offset: 0, transform: 'translateX(0px)', opacity: '1' },
          { offset: 0.4, transform: 'translateX(100%)', opacity: '0' },
          { offset: 0.6, transform: 'translateX(-100%)', opacity: '0' },
          { offset: 1, transform: 'translateX(0px)', opacity: '1' },
        ]); 

      this.animation.play();
    }
  }

  ionViewDidEnter() {
    this.applyTitleAnimation();
  }
}

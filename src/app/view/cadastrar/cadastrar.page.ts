import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ContatoService } from 'src/app/service/contato.service';
import { Contato } from 'src/app/model/contato';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CadastrarPage implements OnInit {
  nome!: string;
  telefone!: string;
  dataNascimento!: string;
  genero!: string;
  maxDate: string;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private contatoService: ContatoService
  ) {
    const hoje = new Date();
    this.maxDate = hoje.toISOString().split('T')[0];
  }

  ngOnInit() {}

  cadastrar(): void {
    if (!this.camposSaoValidos()) {
      this.presentAlert('Erro ao Cadastrar', 'Todos os campos são obrigatórios');
      return;
    }

    const contato: Contato = new Contato(
      this.nome,
      this.telefone,
      this.dataNascimento,
      this.genero
    );

    this.contatoService.create(contato);
    this.presentAlert('Sucesso', 'Contato Cadastrado');
    this.router.navigate(['/home']);
  }

  private camposSaoValidos(): boolean {
    return (
      this.validar(this.nome) &&
      this.validar(this.telefone) &&
      this.validar(this.dataNascimento) &&
      this.validar(this.genero)
    );
  }

  private validar(campo: any): boolean {
    return campo != null && campo !== '';
  }

  private async presentAlert(subHeader: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Agenda de Contatos',
      subHeader: subHeader,
      message: message,
      buttons: ['Ok'],
    });

    await alert.present();
  }
}
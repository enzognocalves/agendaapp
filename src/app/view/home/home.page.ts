import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { add, createOutline, trash, moon, sunny } from 'ionicons/icons';

import { Contato } from 'src/app/model/contato';
import { ContatoService } from 'src/app/service/contato.service';

addIcons({ add, 'create-outline': createOutline, trash, moon, sunny });

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  contatos: Contato[] = [];
  temaAtual: 'light' | 'dark' = 'light';

  constructor(
    private router: Router,
    private contatoService: ContatoService
  ) {}

  ionViewWillEnter(): void {
    this.contatos = [...this.contatoService.contatos];

    // recupera tema salvo no localStorage (se existir)
    const salvo = localStorage.getItem('tema');
    if (salvo === 'dark' || salvo === 'light') {
      this.temaAtual = salvo as 'dark' | 'light';
    }
  }

  irParaCadastrar(): void {
    this.router.navigate(['/cadastrar']);
  }

  detalhar(contato: Contato): void {
    this.router.navigateByUrl('/detalhar', { state: { objeto: contato } });
  }

  editarContato(contato: Contato): void {
    this.router.navigateByUrl('/cadastrar', { state: { objeto: contato } });
  }

  removerContato(contato: Contato): void {
    const idx = this.contatoService.contatos.findIndex(c =>
      c === contato ||
      (!!c?.telefone && !!contato?.telefone && c.telefone === contato.telefone)
    );

    if (idx > -1) {
      this.contatoService.contatos.splice(idx, 1);
      this.contatos = [...this.contatoService.contatos];
    }
  }

  alternarTema(): void {
    this.temaAtual = this.temaAtual === 'light' ? 'dark' : 'light';
    localStorage.setItem('tema', this.temaAtual);
  }
}

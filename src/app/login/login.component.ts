import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorModalComponent } from "../error-modal/error-modal.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [ReactiveFormsModule, ErrorModalComponent]
})
export class LoginComponent {
  // Inyección de dependencias para FormBuilder, HttpClient, AuthService y Router
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router)

  // Creación del formulario usando FormBuilder
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  errorMessage: string | null = null;

  // Método llamado al enviar el formulario
  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    // Llama al servicio de autenticación para realizar el inicio de sesión
    this.authService
      .login(rawForm.email, rawForm.password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/welcome');
        },
        error: (err) => {
          this.errorMessage = err.code;
        }
      });
  }
}
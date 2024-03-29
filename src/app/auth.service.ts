import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth)

  // Método para registrar un nuevo usuario
  register(
    email: string,
    username: string,
    password: string,
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then((response) =>
      updateProfile(response.user, {displayName: username})
    );

    return from(promise);
  }

  // Método para iniciar sesión
  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then(() => {});
    return from(promise);
  }
}

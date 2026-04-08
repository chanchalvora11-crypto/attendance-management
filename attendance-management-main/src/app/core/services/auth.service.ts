import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<Partial<Employee> | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUserSubject.next(JSON.parse(savedUser));
        }
    }

    login(user: Partial<Employee>): void {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    getCurrentUser(): Partial<Employee> | null {
        return this.currentUserSubject.value;
    }

    hasRole(roles: string[]): boolean {
        const user = this.getCurrentUser();
        return !!user && roles.includes(user.role || '');
    }
}

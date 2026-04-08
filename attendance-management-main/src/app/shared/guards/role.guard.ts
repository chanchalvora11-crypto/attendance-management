import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const expectedRoles = route.data['roles'] as Array<string>;
    const user = authService.getCurrentUser();

    if (user && authService.hasRole(expectedRoles)) {
        return true;
    }

    // Redirect to dashboard if not authorized
    router.navigate(['/dashboard']);
    return false;
};

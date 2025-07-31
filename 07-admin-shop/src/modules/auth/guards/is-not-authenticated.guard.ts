import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { AuthStatus } from '../interface/auth-stats.enum';

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();


  await authStore.checkAuthStatus();


  authStore.authStatus === AuthStatus.Authenticate ? next({name:'home'}) : next()
  // const userId = localStorage.getItem('userId');
  // localStorage.setItem('lastPath', to.path);

  // if (!userId) {
  //   return next({
  //     name: 'login',
  //   });
  // }

  // return next();
};

export default isNotAuthenticatedGuard;

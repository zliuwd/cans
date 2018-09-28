import Cookies from 'universal-cookie';

class TimeoutService {
  run() {
    const cookies = new Cookies();
    const expirationTime = cookies.get('_ca_cans_timeout');
    if (!expirationTime) {
      window.location.reload();
    } else {
      const instance = this;
      setTimeout(() => instance.run(), parseInt(expirationTime) - new Date().getTime());
    }
  }
}

export const timeoutService = new TimeoutService();

import { api } from '../../index';

export class I18nService {
  static fetchByInstrumentId(id, lang = 'en') {
    return api.get(`/instruments/${id}/i18n/${lang}`).then(response => response.data);
  }
}

export default I18nService;

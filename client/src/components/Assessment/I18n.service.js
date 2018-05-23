import appApi from '../../App.api';

export class I18nService {
  static fetchByInstrumentId(id, lang = 'en') {
    return appApi.get(`/instruments/${id}/i18n/${lang}`).then(response => response.data);
  }
}

export default I18nService;

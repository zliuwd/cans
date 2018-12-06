# frozen_string_literal: true

Rails.application.config.session_store :redis_store, {
  servers: [
    {
      host: ENV.fetch('REDIS_HOST', 'localhost'),
      port: ENV.fetch('REDIS_PORT', '6379'),
      db: 0,
      namespace: "#{Rails.application.class.parent_name.downcase}_session"
    },
  ],
  key: '_ca_cans_session',
  expire_after: 4.hours,
}

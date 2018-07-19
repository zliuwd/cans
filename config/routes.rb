Rails.application.routes.draw do
  root 'application#fallback_index_html'
  get 'user/account', to: 'account#index'

  namespace :api, defaults: { format: 'json' } do
    resources :people, only: [:show, :create] do
      collection do
        post '_search', to: 'people#search'
      end
    end

    resources :instruments, only: [:show] do
      member do
        get 'i18n/:language/', to: 'instruments#translations_by_instrument_id'
      end
    end

    resources :assessments, only: [:show, :create, :update] do
      collection do
        post '_search', to: 'assessments#search'
      end
    end

    resources :counties, only: [:index] do
    end
  end

  get '*path', to: "application#fallback_index_html", constraints: -> (request) do
    !request.xhr? && request.format.html?
   end
end

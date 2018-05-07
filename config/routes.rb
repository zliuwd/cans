Rails.application.routes.draw do
  root 'assessments#index'

  resource :assessments, only: [:index, :new]
end

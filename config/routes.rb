# frozen_string_literal: true

Rails.application.routes.draw do
  get 'welcome/index'

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :guests, only: %i[create]
    end
  end

  root 'welcome#index'
end

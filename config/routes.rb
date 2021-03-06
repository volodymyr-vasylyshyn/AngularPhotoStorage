AngularPhotoStorage::Application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }


  namespace :api do
    namespace :v1 do
      resources :photos
      resources :albums do
        resources :photos
      end
    end
  end
  match "*path(.:format)" => "home#index", via: :all, format: false
  root 'home#index'
end

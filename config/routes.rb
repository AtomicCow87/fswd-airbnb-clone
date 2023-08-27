Rails.application.routes.draw do
  root to: 'static_pages#home'

  get '/property/:id' => 'static_pages#property'
  
  get '/properties/:id' => 'static_pages#new_property'

  get '/login' => 'static_pages#login'

  get '/logout' => 'static_pages#logout'
  
  get '/user/:user_id' => 'static_pages#user'

  get '/booking/:id/success' => 'static_pages#booking'

  namespace :api do
    # Add routes below this line
    resources :users, only: [:create]
    resources :sessions, only: [:create, :destroy]
    resources :properties, only: [:index, :show, :create]
    resources :bookings, only: [:create]
    resources :charges, only: [:create]

    get '/properties/:id/bookings' => 'bookings#get_property_bookings'
    get '/user/:id/bookings' => 'bookings#get_user_bookings'
    get '/user/:user_id/booked_properties' => 'bookings#get_user_booked_properties'
    get '/authenticated' => 'sessions#authenticated'
    get '/properties/user/:user_id' => 'properties#index_by_user'
    get '/bookings/:id' => 'bookings#booking_success'

    # stripe webhook
    post '/charges/mark_complete' => 'charges#mark_complete'
  end
end
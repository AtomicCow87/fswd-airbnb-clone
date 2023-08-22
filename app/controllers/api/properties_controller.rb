module Api
  class PropertiesController < ApplicationController
    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found unless @properties

      render 'api/properties/index', status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found unless @property

      render 'api/properties/show', status: :ok
    end

    def create
      token = cookies.signed[:airbnb_session_token]

      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized unless session

      user = session.user

      @property = user.properties.new(property_params)

      if @property.save
        render 'api/properties/create', status: :created
      else
        render json: { success: false, error: @property.errors }, status: :bad_request
      end
    end

    private

    def property_params
      params.require(:property).permit(:title, :city, :description, :country, :property_type, :price_per_night, :max_guests, :bedrooms, :beds, :baths, :image)
    end
  end
end

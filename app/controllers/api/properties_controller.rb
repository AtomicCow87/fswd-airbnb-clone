module Api
  class PropertiesController < ApplicationController
    def index
      @properties = Property.order(created_at: :desc).page(params[:page]).per(6)
      return render json: { error: 'not_found' }, status: :not_found if !@properties

      render 'api/properties/index', status: :ok
    end

    def show
      @property = Property.find_by(id: params[:id])
      return render json: { error: 'not_found' }, status: :not_found if !@property

      render 'api/properties/show', status: :ok
    end

    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      begin
        @property = Property.new(property_params)
        @property.user = @current_user
        render 'api/properties/create', status: :created
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end 
    end

    private
      def property_params
        params.require(:property).permit(:title, :city, images: [])
      end
  end
end
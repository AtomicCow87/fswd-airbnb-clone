module Api
  class BookingsController < ApplicationController
    def create
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      property = Property.find_by(id: params[:booking][:property_id])
      return render json: { error: 'cannot find property' }, status: :not_found if !property

      begin
        @booking = Booking.create({ user_id: session.user.id, property_id: property.id, start_date: params[:booking][:start_date], end_date: params[:booking][:end_date]})
        render 'api/bookings/create', status: :created
      rescue ArgumentError => e
        render json: { error: e.message }, status: :bad_request
      end
    end

    def get_property_bookings
      property = Property.find_by(id: params[:id])
      return render json: { error: 'cannot find property' }, status: :not_found if !property

      @bookings = property.bookings.where("end_date > ? ", Date.today)
      render 'api/bookings/index', status: :ok
    end

    def get_user_booked_properties
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      user = session.user
      
      @properties = user.properties
      @bookings = Booking.where(property_id: @properties.map { |property| property.id }).where("end_date > ? ", Date.today)
      @users = User.where(id: @bookings.map { |booking| booking.user_id })
      render 'api/bookings/user', status: :ok
    end

    def get_user_bookings
      token = cookies.signed[:airbnb_session_token]
      session = Session.find_by(token: token)
      return render json: { error: 'user not logged in' }, status: :unauthorized if !session

      user = session.user
      @bookings = user.bookings.where("end_date > ? ", Date.today)
      @properties = @bookings.map { |booking| booking.property }
      render 'api/bookings/user', status: :ok
    end

    def booking_success
      @booking = Booking.find_by(id: params[:id])
      return render json: { error: 'cannot find booking' }, status: :not_found if !@booking

      @property = @booking.property
      @charge = Charge.find_by(booking_id: @booking.id)
      @propertyuser = User.find_by(id: @property.user_id)
      @bookinguser = User.find_by(id: @booking.user_id)

      render 'api/bookings/show', status: :ok
    end

    private

    def booking_params
      params.require(:booking).permit(:property_id, :start_date, :end_date)
    end
  end
end
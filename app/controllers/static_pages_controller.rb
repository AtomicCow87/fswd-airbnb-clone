class StaticPagesController < ApplicationController
  before_action :require_login

  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def login
    @auth = { token: cookies.signed[:airbnb_session_token] }.to_json
    render 'login'
  end

  def logout
    render 'logout'
  end

  def new_property
    render 'new_property'
  end

  def require_login
    token = cookies.signed[:airbnb_session_token]
    session = Session.find_by(token: token)

    if session
      @auth = { loggedin: true }.to_json
    else
      @auth = { loggedin: false }.to_json
    end
  end
end
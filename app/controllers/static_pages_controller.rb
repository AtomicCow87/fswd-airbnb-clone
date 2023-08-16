class StaticPagesController < ApplicationController

  def home
    render 'home'
  end

  def property
    @data = { property_id: params[:id] }.to_json
    render 'property'
  end

  def login
    render 'login'
  end

  def logout
    render 'logout'
  end

  def new_property
    render 'new_property'
  end
end
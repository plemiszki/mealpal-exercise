# frozen_string_literal: true

class Api::V1::GuestsController < Api::V1::BaseController
  def create
    guest = Guest.new(guest_params)
    if guest.save
      head :created
    else
      errors_hash = guest.errors.as_json(full_messages: true)
      render json: {
        errors: errors_hash.deep_transform_keys { |k| k.to_s.camelize(:lower) }
      }, status: 400
    end
  end

  private

  def guest_params
    params[:guest].permit(:name, :phone)
  end
end

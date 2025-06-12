# frozen_string_literal: true

class Api::V1::GuestsController < Api::V1::BaseController
  def create
    customer = Customer.new(customer_params)
    if customer.save
      head :created
    else
      errors_hash = customer.errors.as_json(full_messages: true)
      render json: {
        errors: errors_hash.deep_transform_keys { |k| k.to_s.camelize(:lower) }
      }, status: 400
    end
  end

  private

  def customer_params
    params[:customer].permit(:name, :phone)
  end
end

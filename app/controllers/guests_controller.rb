# frozen_string_literal: true

class Api::V1::GuestsController < Api::V1::BaseController
  def create
    head :created
  end
end

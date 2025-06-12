require 'rails_helper'

RSpec.describe Api::V1::GuestsController, type: :controller do

  context '#create' do

    it 'creates a guest with a valid name and phone number' do
      post :create, params: { guest: { name: "Elwood Blues", phone: "5556345789" } }, as: :json
      expect(response.status).to eq(201)
      expect(Guest.count).to eq(1)
      expect(Guest.first.name).to eq("Elwood Blues")
      expect(Guest.first.phone).to eq("5556345789")
    end
  end
end

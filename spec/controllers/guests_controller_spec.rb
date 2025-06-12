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

    it 'rejects a guest without a name' do
      post :create, params: { guest: { name: "", phone: "5556345789" } }, as: :json
      expect(response.status).to eq(400)
      errors = JSON.parse(response.body)["errors"]
      expect(errors["name"][0]).to eq "Name can't be blank"
    end

    it 'rejects a guest without at least two words in the name' do
      post :create, params: { guest: { name: "Elwood", phone: "5556345789" } }, as: :json
      expect(response.status).to eq(400)
      errors = JSON.parse(response.body)["errors"]
      expect(errors["name"]).to eq [ "Name must be at least two words" ]
    end

    it 'rejects a guest without a phone number' do
      post :create, params: { guest: { name: "Elwood Blues", phone: "" } }, as: :json
      expect(response.status).to eq(400)
      errors = JSON.parse(response.body)["errors"]
      expect(errors["phone"][0]).to eq "Phone can't be blank"
    end

    it 'rejects a guest without a phone number with at least 10 digits' do
      post :create, params: { guest: { name: "Elwood Blues", phone: "555634578" } }, as: :json
      expect(response.status).to eq(400)
      errors = JSON.parse(response.body)["errors"]
      expect(errors["phone"]).to eq [ "Phone is too short (minimum is 10 characters)" ]
    end

    it 'rejects a guest with a phone number with greater than 11 digits' do
      post :create, params: { guest: { name: "Elwood Blues", phone: "115556345789" } }, as: :json
      expect(response.status).to eq(400)
      errors = JSON.parse(response.body)["errors"]
      expect(errors["phone"]).to eq [ "Phone is too long (maximum is 11 characters)" ]
    end

    it 'rejects a guest without a phone number comprised entirely of numbers' do
      post :create, params: { guest: { name: "Elwood Blues", phone: "555-634-578" } }, as: :json
      expect(response.status).to eq(400)
      errors = JSON.parse(response.body)["errors"]
      expect(errors["phone"]).to eq [ "Phone is invalid" ]
    end
  end
end

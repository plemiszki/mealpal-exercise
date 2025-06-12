require 'rails_helper'

RSpec.describe Guest do
  it 'creates a guest' do
    @guest = Guest.create!(name: "Elwood Blues", phone: "5556345789")
    expect(Guest.count).to eq 1
    expect(@guest.name).to eq "Elwood Blues"
  end

  it 'requires a name' do
    expect do
      Guest.create!(name: "", phone: "5556345789")
    end.to raise_error(ActiveRecord::RecordInvalid)
  end

  it 'requires a name of at least two words' do
    expect do
      Guest.create!(name: "Elwood", phone: "5556345789")
    end.to raise_error(ActiveRecord::RecordInvalid)
  end

  it 'requires a phone number' do
    expect do
      Guest.create!(name: "Elwood Blues", phone: "")
    end.to raise_error(ActiveRecord::RecordInvalid)
  end

  it 'requires a phone number of at least 10 digits' do
    expect do
      Guest.create!(name: "Elwood Blues", phone: "555634578")
    end.to raise_error(ActiveRecord::RecordInvalid)
  end

  it 'requires a phone number no greater than 11 digits' do
    expect do
      Guest.create!(name: "Elwood Blues", phone: "115556345789")
    end.to raise_error(ActiveRecord::RecordInvalid)
  end

  it 'requires a phone number of numbers only' do
    expect do
      Guest.create!(name: "Elwood Blues", phone: "555-634-578")
    end.to raise_error(ActiveRecord::RecordInvalid)
  end
end

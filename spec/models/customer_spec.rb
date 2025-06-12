require 'rails_helper'

RSpec.describe Customer do
  it 'creates a customer' do
    @customer = Customer.create!(name: "Elwood Blues", phone: "5556345789")
    expect(Customer.count).to eq 1
    expect(@customer.name).to eq "Elwood Blues"
  end

  it 'requires a name' do
    expect do
      Customer.create!(name: "", phone: "5556345789")
    end.to raise_error(ActiveRecord::RecordInvalid)
  end

  it 'requires a name of at least two words' do
    expect do
      Customer.create!(name: "Elwood", phone: "5556345789")
    end.to raise_error(ActiveRecord::RecordInvalid)
  end

  it 'requires a phone number' do
    expect do
      Customer.create!(name: "Elwood Blues", phone: "")
    end.to raise_error(ActiveRecord::RecordInvalid)
  end

  it 'requires a phone number of at least 10 digits' do
    expect do
      Customer.create!(name: "Elwood Blues", phone: "555634578")
    end.to raise_error(ActiveRecord::RecordInvalid)
  end

  it 'requires a phone number no greater than 11 digits' do
    expect do
      Customer.create!(name: "Elwood Blues", phone: "115556345789")
    end.to raise_error(ActiveRecord::RecordInvalid)
  end

  it 'requires a phone number of numbers only' do
    expect do
      Customer.create!(name: "Elwood Blues", phone: "phone")
    end.to raise_error(ActiveRecord::RecordInvalid)
  end
end

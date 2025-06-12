require 'rails_helper'

describe 'guest_form', type: :feature do

  before(:each) do
    visit "/"
    fields = find_all('input')
    @name_field = fields[0]
    @phone_field = fields[1]
    @submit_button = find('button', text: 'View menu')
  end

  it 'displays the form' do
    expect(page).to have_content('Welcome')
    expect(page).to have_content('Please provide your full name and phone number.')
  end

  it 'submits the form with valid info' do
    @name_field.set('Elwood Blues')
    @phone_field.set('5556345789')
    @submit_button.click

    expect(page).to have_content('Thank You!')
    expect(page).to have_content('Thank you for submitting the form Elwood Blues.')

    expect(Guest.count).to eq(1)
    guest = Guest.first
    expect(guest.name).to eq("Elwood Blues")
    expect(guest.phone).to eq("5556345789")
  end

end

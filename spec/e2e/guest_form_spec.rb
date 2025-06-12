require 'rails_helper'

NAME_ERROR_TEXT = 'must be your first and last name'
PHONE_ERROR_TEXT ='numbers only (ex. 1231231234)'

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

  it 'displays an error if the form is submitted with no name' do
    @phone_field.set('5556345789')
    @submit_button.click

    expect(page).to have_content(NAME_ERROR_TEXT)

    expect(Guest.count).to eq(0)
  end

  it 'displays an error if the form is submitted with only one word in the name' do
    @name_field.set('Elwood')
    @phone_field.set('5556345789')
    @submit_button.click

    expect(page).to have_content(NAME_ERROR_TEXT)

    expect(Guest.count).to eq(0)
  end

  it 'displays an error if the form is submitted with no phone number' do
    @name_field.set('Elwood Blues')
    @submit_button.click

    expect(page).to have_content(PHONE_ERROR_TEXT)

    expect(Guest.count).to eq(0)
  end

  it 'displays an error if the form is submitted with a phone number that is not exclusively numbers' do
    @name_field.set('Elwood Blues')
    @phone_field.set('555-634-5789')
    @submit_button.click

    expect(page).to have_content(PHONE_ERROR_TEXT)

    expect(Guest.count).to eq(0)
  end

  it 'displays an error if the form is submitted with a phone number that is too short' do
    @name_field.set('Elwood Blues')
    @phone_field.set('555634578')
    @submit_button.click

    expect(page).to have_content(PHONE_ERROR_TEXT)

    expect(Guest.count).to eq(0)
  end

  it 'displays an error if the form is submitted with a phone number that is too long' do
    @name_field.set('Elwood Blues')
    @phone_field.set('115556345789')
    @submit_button.click

    expect(page).to have_content(PHONE_ERROR_TEXT)

    expect(Guest.count).to eq(0)
  end

end

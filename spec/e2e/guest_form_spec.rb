require 'rails_helper'

describe 'guest_form', type: :feature do

  it 'displays the form' do
    visit "/"
    expect(page).to have_content('Welcome')
    expect(page).to have_content('Please provide your full name and phone number.')
  end

end

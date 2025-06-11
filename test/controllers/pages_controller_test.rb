require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get guest" do
    get pages_guest_url
    assert_response :success
  end
end

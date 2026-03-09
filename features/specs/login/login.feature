Feature: Login

  As a registered user
  I want to log into the test application
  So that I can access the secure area

  
  Scenario: Login with valid credentials
    Given the user is on the login page
    When the user logs in with valid credentials
    Then the user should be redirected to the secure area
    And a success message should be displayed
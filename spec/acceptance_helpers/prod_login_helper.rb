# frozen_string_literal: true

require 'acceptance_helpers/login_helper'

module ProdLoginHelper
  include LoginHelper

  def enter_credentials(login_config = default_json)
    fill_in 'Email', with: login_config[:user]
    fill_in 'Password', with: login_config[:password]
    click_button 'Sign In'
    enter_verification_code login_config
    expect(page).to have_content('CANS')
  end

  private

  def default_json
    worker_json
  end

  def worker_json
    credentials = {}
    credentials[:user] = ENV.fetch('WORKER_USERNAME')
    credentials[:password] = ENV.fetch('WORKER_PASSWORD')
    credentials[:verification_code] = ENV.fetch('WORKER_VERIFICATION_CODE')
    credentials
  end

  def supervisor_json
    credentials = {}
    credentials[:user] = ENV.fetch('SUPERVISOR_USERNAME')
    credentials[:password] = ENV.fetch('SUPERVISOR_PASSWORD')
    credentials[:verification_code] = ENV.fetch('SUPERVISOR_VERIFICATION_CODE')
    credentials
  end

  def enter_verification_code(login_config)
    return unless page.has_xpath?('//label[text()="Verification Code"]')
    fill_in 'Verification Code', with: login_config[:verification_code]
    click_button 'validateButton'
  end
end

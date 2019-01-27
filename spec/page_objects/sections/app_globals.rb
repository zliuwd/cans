# frozen_string_literal: true

class AppGlobals < SitePrism::Section
  element :warning_modal_heading, 'div.warning-modal-heading'
  element :delete_warning_modal, 'div.modal', text: 'Deleting CANS Warning'
  element :complete_warning_modal, 'div.modal', text: 'Reminder'
  element :cancel_button_of_warning, 'button.warning-modal-logout'
  element :agree_button_of_warning, 'button.warning-modal-stay-logged-in'
end

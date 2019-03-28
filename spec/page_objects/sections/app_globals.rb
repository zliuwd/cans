# frozen_string_literal: true

class AppGlobals < SitePrism::Section
  element :warning_modal_heading, 'div.warning-modal-heading'
  element :delete_warning_modal, 'div.modal'
  element :complete_warning_modal,
          'div.complete-modal-header', text: 'Completed CANS are unable to be edited.'
  element :complete_warning_save_return_button, 'button.save-return-button'
  element :complete_warning_confirm_button, 'button.complete-confirm-button'
  element :reason_select_drop_down, 'div.list__indicator'
  elements:reason_select_options, '.list__option'
  element :cancel_button_of_warning, 'button.warning-modal-logout'
  element :agree_button_of_warning, 'button.warning-modal-stay-logged-in'
  element :return_to_the_assessment_button, 'button', text: 'Return to the assessment'
  element :save_and_continue_button, 'button', text: 'SAVE CHANGES AND CONTINUE'
  element :discard_and_continue_button, 'button', text: 'Discard changes and continue'
end

# frozen_string_literal: true

require 'faker'
require 'active_support/time'

module CompletionResourceHelper
  def fill_assessment_form_age_0_5
    click_button 'Expand All'
    all_regular_ratings = page.all('div.item-reg-rating label', text: '1')
    all_regular_ratings.each(&:click)
    all_boolean_ratings = page.all('div.item-bool-rating label', text: 'Yes')
    all_boolean_ratings.each(&:click)
    all_items_amount = page.all('span.progress-value').map(&:text)
    all_items_amount.each { |element| @domain_total_count.push(element.split('/')[1]) }
    change_some_rating_to_mixed_value
    adjust_domain_total_count
    click_button 'Collapse All'
  end

  def change_some_rating_to_mixed_value
    targets = [
      '#label-IMPULSIVITY_HYPERACTIVITY-0',
      '#label-ANXIETY-2',
      '#label-OPPOSITIONAL-3',
      '#label-SEXUAL_ABUSE-0'
    ]
    targets.each { |element| find(element).click }
  end

  def adjust_domain_total_count
    @domain_total_count[0] = (@domain_total_count[0].to_i + 2).to_s
    @domain_total_count[-1] = (@domain_total_count[-1].to_i - 1).to_s
  end
end

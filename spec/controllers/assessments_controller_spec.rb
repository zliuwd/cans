# frozen_string_literal: true

require 'rails_helper'

describe AssessmentsController do
  describe '#index' do
    it 'has a route' do
      expect(get: '/').to route_to(controller: 'application', action: 'fallback_index_html')
    end
  end
end

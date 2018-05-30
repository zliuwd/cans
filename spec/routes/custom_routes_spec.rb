# frozen_string_literal: true

require 'rails_helper'

describe 'custom routes' do
  it 'routes everything to the root', type: :routing do
    expect(get: '/').to route_to('application#fallback_index_html')
  end
end

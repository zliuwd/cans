# frozen_string_literal: true

require 'rails_helper'

describe AssessmentsController do
  describe '#index' do
    it 'has a route' do
      expect(get: '/').to route_to(controller: 'assessments', action: 'index')
    end

    it 'renders a template' do
      get :index
      expect(response).to render_template :index
    end
  end

  describe '#new' do
    it 'has a route' do
      expect(get: 'assessments/new').to route_to(controller: 'assessments', action: 'new')
    end

    it 'assigns a new assessment' do
      get :new
      expect(assigns(:assessment).construct.name).to eq 'Default'
    end
  end
end

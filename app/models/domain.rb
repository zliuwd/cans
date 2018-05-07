# frozen_string_literal: true

class Domain < ApplicationRecord
  has_many :items
end

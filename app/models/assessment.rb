# frozen_string_literal: true

class Assessment < ApplicationRecord
  belongs_to :construct
  has_many :scores
end

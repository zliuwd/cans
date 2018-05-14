# frozen_string_literal: true

module Infrastructure
  class QueryParamRemover
    def remove_query_param(url, param)
      return url unless param
      return '' unless url
      uri = Addressable::URI.parse(url)
      remove_value(uri, param)
      uri.to_s
    end

    private

    def remove_value(uri, param)
      uri.query_values = uri.query_values.except(param) if uri.query_values
      uri.query_values = nil if uri&.query_values&.empty?
    end
  end
end

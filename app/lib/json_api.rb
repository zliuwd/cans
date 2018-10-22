# frozen_string_literal: true

class JsonAPI # :nodoc:
  CONTENT_TYPE = 'application/json'

  def self.connection
    Faraday.new(url: "https://doraapi.preint.cwds.io") do |connection|
      connection.response :json, content_type: /\bjson$/
      connection.use IntakeFaradayMiddleware::RaiseHttpException
      connection.adapter Faraday.default_adapter
      connection
    end
  end

  #def self.make_api_call(security_token, request_id, url, method, payload = nil)
   # debugger
    #connection.send(method) do |req|
     # req.url url
      #req.headers['REQUEST_ID'] = request_id
      #req.headers['Authorization'] = security_token
      #set_payload(req, method, payload)
    #end
  #rescue Faraday::Error => e
   # raise_api_error(e.message, payload, url, method)
  #end

    def self.make_api_call(security_token:, request_id:, url:, method:, payload: nil)
    connection.send(method) do |req|
      req.url url
      req.headers['Authorization'] = security_token
      req.headers['REQUEST_ID'] = request_id
      req.headers['SESSION_ID'] = security_token
      set_payload(req, method, payload)
      # "Authorization"=>"25d5fa24-1e80-4cd1-b91f-e550412edcc0", "REQUEST_ID"=>"8150c5ff-53b3-49e5-9162-8d9adbbde301"
    end
  rescue Faraday::Error => e
    raise_api_error(e.message, payload, url, method)
  end

  private_class_method def self.raise_api_error(message, payload, url, method)
    raise ApiError,
      message: message,
      sent_attributes: payload ? payload.to_json : '',
      url: url,
      method: method
  end

  private_class_method def self.set_payload(req, method, payload)
    return req if payload.nil?

    if method == :get
      req.options.params_encoder = Faraday::FlatParamsEncoder
      req.params = payload
    else
    
      req.headers['Content-Type'] = CONTENT_TYPE
      req.body = payload.to_json
    end
    req
  end
end

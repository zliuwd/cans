Rails.application.routes.draw do
  root 'application#fallback_index_html'
  get '*path', to: "application#fallback_index_html", constraints: -> (request) do
    !request.xhr? && request.format.html?
   end
end

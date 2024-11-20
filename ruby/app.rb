require 'sinatra'
require 'jwt'

METABASE_EMBEDDING_SECRET = ENV.fetch('METABASE_EMBEDDING_SECRET') 
METABASE_SITE_URL = ENV.fetch('METABASE_SITE_URL', 'http://localhost:3000')
METABASE_EMBED_DASHBOARD_ID = ENV.fetch('METABASE_EMBED_DASHBOARD_ID', '1').to_i

get '/' do
  payload = {
    resource: {dashboard: METABASE_EMBED_DASHBOARD_ID},
    params: {},
    exp: Time.now.to_i + (60 * 10) # 10 minute expiration
  }
  token = JWT.encode payload, METABASE_EMBEDDING_SECRET
  iframe_url = URI.join(METABASE_SITE_URL,
                        "/embed/dashboard/",
                         token,
                        "#bordered=true&titled=true")

  <<~TEXT
  <iframe
    src="#{iframe_url}"
    frameborder="0"
    width="800"
    height="600"
    allowtransparency>
  </iframe>
  TEXT
end

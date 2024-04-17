import time
import os
from urllib.parse import urljoin

from flask import Flask
import jwt

app = Flask(__name__)

METABASE_SITE_URL = os.environ.get('METABASE_SITE_URL', 'http://localhost:3000')
METABASE_EMBEDDING_SECRET = os.environ.get('METABASE_EMBEDDING_SECRET')
METABASE_EMBED_DASHBOARD_ID = int(os.environ.get('METABASE_EMBED_DASHBOARD_ID', '1'))

@app.route("/")
def static_embed():
    payload = {
        "resource": {"dashboard": METABASE_EMBED_DASHBOARD_ID},
        "params": {        
        },
        "exp": round(time.time()) + (60 * 10) # 10 minute expiration
    }
    token = jwt.encode(payload, METABASE_EMBEDDING_SECRET, algorithm="HS256")
    iframeUrl = urljoin(METABASE_SITE_URL, "/embed/dashboard/" + token + "#bordered=true&titled=true")
    return f'''<script src="{METABASE_SITE_URL}/app/iframeResizer.js"></script>
            <iframe src="{iframeUrl}" frameborder="0" width="800" height="600" onload="iFrameResize({{}}, this)" allowtransparency></iframe>
            '''

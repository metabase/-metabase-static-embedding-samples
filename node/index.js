const jwt = require("jsonwebtoken");
const express = require('express');
const app = express();
const port = 9090;

const METABASE_EMBEDDING_SECRET = process.env.METABASE_EMBEDDING_SECRET;
const METABASE_SITE_URL = process.env.METABASE_SITE_URL || 'http://localhost:3000';
const METABASE_EMBED_DASHBOARD_ID= process.env.METABASE_EMBED_DASHBOARD_ID || 1;

app.get('/', (req, res) => {
  const payload = {
    resource: { dashboard: METABASE_EMBED_DASHBOARD_ID },
    params: {},
    exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
  };
  const token = jwt.sign(payload, METABASE_EMBEDDING_SECRET);

  const iframeUrl = new URL("/embed/dashboard/" + token, METABASE_SITE_URL);

  iframeUrl.hash = "theme=night&background=true";
  res.send(
    `
    <script src="{METABASE_SITE_URL}/app/iframeResizer.js"></script>
            <!DOCTYPE html>
    <html>
    <body style="background-color:black;">
    <iframe id="metabase" src="${iframeUrl}" frameborder="0" width="1280" height="1000" allowtransparency></iframe>
    </body>
    </html>
  );
  `);

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

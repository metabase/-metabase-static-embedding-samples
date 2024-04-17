# Metabase Python static embedding sample

This sample code demonstrates using Metabase static embedding in Python using Flask.

## Pre-requisites
* Have a running instance of Metabase. If you don't have one
  * [download the free open source version](https://www.metabase.com/start/oss/) or
  * [sign up for a free trial of Metabase Cloud](https://www.metabase.com/pricing/).
* A dashboard to embed. If you don't have one, use X-Rays to let Metabase create one for you. Note down the dashboard id.

## Preparing the embed
1. Sign in to your Metabase instance as an admin. 
2. Go to admin settings and enabling embedding.
3. Under admin settings/embedding, click on static embedding and copy the embedding secret key.

## Configure the app

1. Paste the secret key into an env var: `$ export METABASE_EMBEDDING_SECRET="PASTE_SECRET_HERE"`
2. Create an env var pointing to your Metabase site URL, if it's not on http://localhost:3000 `$ export METABASE_SITE_URL="http://localhost:4000"`
3. Create an env var with the ID of the dashboard to embed, if it's not 1: `$ export METABASE_EMBED_DASHBOARD_ID="8"`

## Embed the dashboard
1. Go to your dashboard, click on the share/embed button at the top
2. Click on the "Publish" button

# Running the sample
1. Create the virtual environment: `$ python3 -m venv .venv`
2. Activate the virtual environment: `$ source .venv/bin/activate`
3. Install the dependencies: `$ pip install -r requirements.txt`
4. Start the app: `$ flask run -p 9090`
5. Open the app at http://localhost:9090

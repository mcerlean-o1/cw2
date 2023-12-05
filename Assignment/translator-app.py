from flask import Flask, render_template, request, jsonify
import requests
import uuid
import json

app = Flask(__name__)



# Add your key and endpoint
key = "a1e2f9f7537a46dbb20edd8de88646b3"
endpoint = 'https://api.cognitive.microsofttranslator.com/' 
location = "eastus" 

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate():
    text_to_translate = request.json['text_to_translate']


    path = '/translate'
    constructed_url = endpoint + path
    params = {
        'api-version': '3.0',
        'from': 'en',
        'to': ['fr', 'zu']
    }

    headers = {
        'Ocp-Apim-Subscription-Key': key,
    # location required if you're using a multi-service or regional (not global) resource.
        'Ocp-Apim-Subscription-Region': location,
        'Content-type': 'application/json',
        'X-ClientTraceId': str(uuid.uuid4())
    }
    # You can pass more than one object in body.
    body = [
        {'text': text_to_translate}
    ]

    request = requests.post(constructed_url, params=params, headers=headers, json=body)

    response = request.json()

    translations = [result['translations'][0]['text'] for result in response]

    return jsonify({'translations' : translations})

if __name__ == '__main__':
    app.run(debug=True)



    #print(json.dumps(response, sort_keys=True, ensure_ascii=False, indent=4, separators=(',', ': ')))

from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import os

# Assuming your gpt_api module and its methods are correctly implemented
from gpt_api import (
    generate_content as gpt_generate_content,
    generate_code as gpt_generate_code,
    generate_educational_content as gpt_generate_educational_content,
)

app = Flask(__name__)
CORS(app)  # Enable CORS on all routes
logging.basicConfig(level=logging.INFO)  # Configure logging

# Apply HTTPS and security headers with Talisman
# Commented out for development. Uncomment for production with correct configuration
# from flask_talisman import Talisman
# Talisman(app)

@app.route('/generate_content', methods=['POST', 'OPTIONS'])
def content_route():
    if request.method == 'OPTIONS':  # Needed for preflight requests
        return build_preflight_response()
    elif request.method == 'POST':
        try:
            data = request.get_json()
            prompt = data['prompt']
            tone = data.get('tone', 'Neutral')
            generated_content = gpt_generate_content(prompt, tone)
            return jsonify({'generated_content': generated_content}), 200
        except KeyError as e:
            app.logger.error(f'Missing key: {e}')
            return jsonify({'error': f'Missing key: {e}'}), 400
        except Exception as e:
            app.logger.error(f'An error occurred: {e}')
            return jsonify({'error': f'An error occurred: {e}'}), 500

@app.route('/generate_code', methods=['POST', 'OPTIONS'])
def code_route():
    # Similar OPTIONS handling as above
    if request.method == 'OPTIONS':
        return build_preflight_response()
    elif request.method == 'POST':
        try:
            data = request.get_json()
            prompt = data['prompt']
            generated_code = gpt_generate_code(prompt)
            return jsonify({'generated_code': generated_code}), 200
        except Exception as e:
            app.logger.error(f'An error occurred: {e}')
            return jsonify({'error': f'An error occurred: {e}'}), 500

@app.route('/generate_educational_content', methods=['POST', 'OPTIONS'])
def educational_content_route():
    # Similar OPTIONS handling as above
    if request.method == 'OPTIONS':
        return build_preflight_response()
    elif request.method == 'POST':
        try:
            data = request.get_json()
            prompt = data['prompt']
            generated_content = gpt_generate_educational_content(prompt)
            return jsonify({'generated_content': generated_content}), 200
        except Exception as e:
            app.logger.error(f'An error occurred: {e}')
            return jsonify({'error': f'An error occurred: {e}'}), 500

def build_preflight_response():
    response = jsonify({'status': 'ok'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', '*')
    return response

if __name__ == '__main__':
    app.run(debug=True)

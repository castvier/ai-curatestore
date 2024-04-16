from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
from gpt_api import generate_content, generate_code, generate_educational_content

app = Flask(__name__)
cors = CORS(app, resources={r"/\*": {"origins": "http://127.0.0.1:5003"}})
logging.basicConfig(level=logging.INFO)  # Configure logging

# Apply HTTPS and security headers with Talisman
# Commented out for development. Uncomment for production with correct configuration
# from flask_talisman import Talisman
# Talisman(app)

@app.route('/generate_content', methods=['POST', 'OPTIONS'])
def content_route():
    app.logger.info(f'Request headers: {request.headers}')
    app.logger.info(f'Request origin: {request.origin}')
    if request.method == 'OPTIONS':  # Needed for preflight requests
        return build_preflight_response()
    elif request.method == 'POST':
        try:
            data = request.get_json()
            prompt = data['prompt']
            tone = data.get('tone', 'Neutral')
            generated_content = generate_content(prompt, tone)
            return jsonify({'generated_content': generated_content}), 200
        except KeyError as e:
            app.logger.error(f'Missing key in request data: {e}')
            return jsonify({'error': f'Missing key: {e}'}), 400
        except Exception as e:
            app.logger.error(f'An error occurred while generating content: {e}')
            return jsonify({'error': f'An error occurred: {e}'}), 500

@app.route('/generate_code', methods=['POST', 'OPTIONS'])
def code_route():
    app.logger.info(f'Request headers: {request.headers}')
    app.logger.info(f'Request origin: {request.origin}')
    # Similar OPTIONS handling as above
    if request.method == 'OPTIONS':
        return build_preflight_response()
    elif request.method == 'POST':
        try:
            data = request.get_json()
            prompt = data['prompt']
            generated_code = generate_code(prompt)
            return jsonify({'generated_code': generated_code}), 200
        except Exception as e:
            app.logger.error(f'An error occurred while generating code: {e}')
            return jsonify({'error': f'An error occurred: {e}'}), 500

@app.route('/generate_educational_content', methods=['POST', 'OPTIONS'])
def educational_content_route():
    app.logger.info(f'Request headers: {request.headers}')
    app.logger.info(f'Request origin: {request.origin}')
    # Similar OPTIONS handling as above
    if request.method == 'OPTIONS':
        return build_preflight_response()
    elif request.method == 'POST':
        try:
            data = request.get_json()
            prompt = data['prompt']
            tone = data.get('tone', 'Neutral')  # Get the tone from the request or use 'Neutral' as the default
            generated_content = generate_educational_content(prompt, tone)
            return jsonify({'generated_content': generated_content}), 200
        except Exception as e:
            app.logger.error(f'An error occurred while generating educational content: {e}')
            return jsonify({'error': f'An error occurred: {e}'}), 500

def build_preflight_response():
    response = jsonify({'status': 'ok'})
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', '*')
    return response

# If running behind a reverse proxy or load balancer, configure the following:
# app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)

if __name__ == '__main__':
    app.run(debug=True)
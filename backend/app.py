from flask import Flask, request, jsonify
from flask_talisman import Talisman
from gpt_api import (
    generate_content as gpt_generate_content,
    generate_code as gpt_generate_code,
    generate_educational_content as gpt_generate_educational_content,
)

app = Flask(__name__)
Talisman(app)  # Apply HTTPS and security headers to enhance security

@app.route('/generate_content', methods=['POST'])
def content_route():
    try:
        data = request.get_json()  # Ensuring the JSON data is correctly parsed
        prompt = data['prompt']
        tone = data.get('tone', 'Neutral')  # Retrieve the tone from the request, defaulting to 'Neutral'
        # Ensure your gpt_generate_content function can handle the tone parameter
        generated_content = gpt_generate_content(prompt, tone)
        return jsonify({'generated_content': generated_content}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate_code', methods=['POST'])
def code_route():
    try:
        data = request.get_json()
        prompt = data['prompt']
        # Make sure gpt_generate_code is implemented correctly
        generated_code = gpt_generate_code(prompt)
        return jsonify({'generated_code': generated_code}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate_educational_content', methods=['POST'])
def educational_content_route():
    try:
        data = request.get_json()
        prompt = data['prompt']
        # Confirm that gpt_generate_educational_content works as expected
        generated_content = gpt_generate_educational_content(prompt)
        return jsonify({'generated_content': generated_content}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

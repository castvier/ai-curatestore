from flask import Flask, request, jsonify
from flask_talisman import Talisman
from gpt_api import (
    generate_content as gpt_generate_content,
    generate_code as gpt_generate_code,
    generate_educational_content as gpt_generate_educational_content,
)

app = Flask(__name__)
Talisman(app)  # Apply HTTPS and security headers

@app.route('/generate_content', methods=['POST'])
def content_route():
    try:
        prompt = request.json['prompt']
        generated_content = gpt_generate_content(prompt)
        return jsonify({'generated_content': generated_content}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate_code', methods=['POST'])
def code_route():
    try:
        prompt = request.json['prompt']
        generated_code = gpt_generate_code(prompt)
        return jsonify({'generated_code': generated_code}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/generate_educational_content', methods=['POST'])
def educational_content_route():
    try:
        prompt = request.json['prompt']
        generated_content = gpt_generate_educational_content(prompt)
        return jsonify({'generated_content': generated_content}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

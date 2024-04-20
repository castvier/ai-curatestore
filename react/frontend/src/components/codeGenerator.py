from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

class CodeGenerator:
    def __init__(self):
        self.prompt = ''
        self.generated_code = ''
        self.is_loading = False
        self.error = None

    def generate_code(self):
        try:
            response = requests.post('http://localhost:5003/generate_code', json={'prompt': self.prompt})
            self.generated_code = response.json()['generated_code']
        except Exception as e:
            print('Code generation error:', e)
            self.error = 'Failed to generate code. Please try again later.'
        finally:
            self.is_loading = False

code_generator = CodeGenerator()

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        code_generator.prompt = request.form['prompt']
        code_generator.generate_code()
    return render_template('index.html', code_generator=code_generator)

if __name__ == '__main__':
    app.run(debug=True)
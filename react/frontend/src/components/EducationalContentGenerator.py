from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

class EducationalContentGenerator:
    def __init__(self):
        self.prompt = ''
        self.difficulty = 'Easy'
        self.generated_content = ''
        self.is_loading = False
        self.error = None

    def generate_educational_content(self):
        try:
            response = requests.post('http://localhost:5003/generate_educational_content', json={'prompt': self.prompt, 'difficulty': self.difficulty})
            self.generated_content = response.json()['generated_content']
        except Exception as e:
            print('Educational content generation error:', e)
            self.error = 'Failed to generate educational content. Please try again later.'
        finally:
            self.is_loading = False

educational_content_generator = EducationalContentGenerator()

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        educational_content_generator.prompt = request.form['prompt']
        educational_content_generator.difficulty = request.form['difficulty']
        educational_content_generator.generate_educational_content()
    return render_template('educational_content_generator.html', educational_content_generator=educational_content_generator)

if __name__ == '__main__':
    app.run(debug=True)

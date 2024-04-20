from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

class ContentGenerator:
    def __init__(self):
        self.prompt = ''
        self.tone = 'Neutral'
        self.generated_content = ''
        self.is_loading = False
        self.error = None

    def generate_content(self):
        try:
            response = requests.post('http://localhost:5003/generate_content', json={'prompt': self.prompt, 'tone': self.tone})
            self.generated_content = response.json()['generated_content']
        except Exception as e:
            print('Content generation error:', e)
            self.error = 'Failed to generate content. Please try again later.'
        finally:
            self.is_loading = False

content_generator = ContentGenerator()

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        content_generator.prompt = request.form['prompt']
        content_generator.tone = request.form['tone']
        content_generator.generate_content()
    return render_template('content_generator.html', content_generator=content_generator)

if __name__ == '__main__':
    app.run(debug=True)

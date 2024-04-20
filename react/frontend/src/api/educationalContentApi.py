import requests
from mock_data import mock_educational_content_response

api_base_url = 'http://localhost:5003'

def generate_educational_content(prompt, difficulty):
    try:
        if api_base_url:
            response = requests.post(f'{api_base_url}/generate_educational_content', json={'prompt': prompt, 'difficulty': difficulty})
            return response.json()['generated_content']
        else:
            return mock_educational_content_response['generated_content']
    except Exception as e:
        print('Error generating educational content:', e)
        raise e
import requests
from mock_data import mock_content_response

api_base_url = 'http://localhost:5003'

def generate_content(prompt, tone):
    try:
        if api_base_url:
            response = requests.post(f'{api_base_url}/generate_content', json={'prompt': prompt, 'tone': tone})
            return response.json()['generated_content']
        else:
            return mock_content_response['generated_content']
    except Exception as e:
        print('Error generating content:', e)
        raise e
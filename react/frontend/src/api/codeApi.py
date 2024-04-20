# codeApi.py
import requests
from mock_data import mock_code_response

api_base_url = 'http://localhost:5003'

def generate_code(prompt):
    try:
        if api_base_url:
            response = requests.post(f'{api_base_url}/generate_code', json={'prompt': prompt})
            return response.json()['generated_code']
        else:
            return mock_code_response['generated_code']
    except Exception as e:
        print('Error generating code:', e)
        raise e

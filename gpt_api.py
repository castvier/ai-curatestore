import openai
from config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

def generate_content(prompt):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    )

    generated_content = response.choices[0].text.strip()
    return generated_content

def generate_code(prompt):
    response = openai.Completion.create(
        engine="code-davinci-002",
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    )

    generated_code = response.choices[0].text.strip()
    return generated_code

def generate_educational_content(prompt):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    )

    generated_content = response.choices[0].text.strip()
    return generated_content
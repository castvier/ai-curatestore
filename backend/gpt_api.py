import openai
from config import OPENAI_API_KEY
import logging

# Configure your logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger()

openai.api_key = OPENAI_API_KEY

def generate_content(prompt, tone='Neutral', engine="text-davinci-003", max_tokens=1024, temperature=0.5):
    """
    Generate content using the OpenAI GPT API, adjusting the prompt based on the tone.
    """
    tone_prefix = f"Tone: {tone}\n"
    modified_prompt = tone_prefix + prompt

    try:
        response = openai.Completion.create(
            engine=engine,
            prompt=modified_prompt,
            max_tokens=max_tokens,
            temperature=temperature
        )
        generated_content = response.choices[0].text.strip()
        is_plagiarized = check_for_plagiarism(generated_content)
        return {'generated_content': generated_content, 'is_plagiarized': is_plagiarized}
    except openai.error.OpenAIError as e:
        logger.error(f"OpenAI API error: {str(e)}")
        return {'error': f"OpenAI API error: {str(e)}"}
    except Exception as e:
        logger.error(f"An unexpected error occurred: {str(e)}")
        return {'error': f"An unexpected error occurred: {str(e)}"}


def generate_code(prompt, engine="code-davinci-002", max_tokens=1024, temperature=0.5):
    """
    Generate code using the OpenAI GPT API.
    """
    try:
        response = openai.Completion.create(
            engine=engine,
            prompt=prompt,
            max_tokens=max_tokens,
            temperature=temperature
        )
        generated_code = response.choices[0].text.strip()
        return {'generated_code': generated_code}
    except openai.error.OpenAIError as e:
        logger.error(f"OpenAI API error: {str(e)}")
        return {'error': f"OpenAI API error: {str(e)}"}
    except Exception as e:
        logger.error(f"An unexpected error occurred: {str(e)}")
        return {'error': f"An unexpected error occurred: {str(e)}"}

def generate_educational_content(prompt, difficulty="Easy", engine="text-davinci-003", max_tokens=1024, temperature=0.5):
    """
    Generate educational content using the OpenAI GPT API, adjusted for difficulty level.
    """
    difficulty_prefix_map = {
        "Easy": "Explain like I'm five: ",
        "Medium": "Explain like I'm a high school student: ",
        "Hard": "Explain like I'm a graduate student specializing in the subject: "
    }
    difficulty_prefix = difficulty_prefix_map.get(difficulty, "Explain like I'm five: ")
    modified_prompt = difficulty_prefix + prompt

    try:
        response = openai.Completion.create(
            engine=engine,
            prompt=modified_prompt,
            max_tokens=max_tokens,
            temperature=temperature
        )
        generated_educational_content = response.choices[0].text.strip()
        return {'generated_educational_content': generated_educational_content}
    except openai.error.OpenAIError as e:
        logger.error(f"OpenAI API error: {str(e)}")
        return {'error': f"OpenAI API error: {str(e)}"}
    except Exception as e:
        logger.error(f"An unexpected error occurred: {str(e)}")
        return {'error': f"An unexpected error occurred: {str(e)}"}

# Plagiarism check function placeholder
# Implement if needed
def check_for_plagiarism(content):
    """
    Check the generated content for plagiarism.
    This function should be replaced with an actual call to a plagiarism detection API or custom logic.
    """
    # Placeholder for your implementation
    # Example structure for integrating with a plagiarism detection service:
    try:
        # This is where you'd send 'content' to the plagiarism detection service
        # and parse the response to determine if plagiarism is detected
        # For example:
        # response = plagiarism_service.check(content)
        # is_plagiarized = response.get("is_plagiarized", False)
        
        # For this placeholder, we'll return False to indicate no plagiarism was detected
        is_plagiarized = False
        return is_plagiarized
    except Exception as e:
        # You should decide how to handle exceptions here
        # For this placeholder, we'll log the exception and return False
        logger.error(f"Plagiarism check error: {str(e)}")
        return False

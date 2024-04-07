from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()

# client = OpenAI(api_key=os.getenv('OPENAI-GPT-KEY'))
# response = client.chat.completions.create(
#     model='gpt-4-turbo-preview',
#     messages=[
#         {'role': 'user', 'content': "I am feeling sad. Please tell me how I can be better"}
#     ],
#     temperature=0,
#     stream=True,
#     max_tokens = 100
# )

# for chunk in response:
#     print(chunk.choices[0].delta.content, end="")



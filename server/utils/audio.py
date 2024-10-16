import sys
import os
import json
from gtts import gTTS

# Define the folder to store audio files
AUDIO_FOLDER = r'D:\Code\Web Development\project\Full stack\Avatarify\server\audio'

# Create folder if it doesn't exist
if not os.path.exists(AUDIO_FOLDER):
    os.makedirs(AUDIO_FOLDER)

# Function to convert text to speech
def text_to_speech(messages):
    for idx, message in enumerate(messages):
        if isinstance(message, dict):  # Check if message is a dictionary
            text = message.get('message', '')  # Access message text from the object
            if text:
                # Convert text to speech
                tts = gTTS(text, lang='en')
                
                # Save the speech as an mp3 file
                audio_file = os.path.join(AUDIO_FOLDER, f'message_{idx + 1}.mp3')
                tts.save(audio_file)
                
                print(f'Audio file saved: {audio_file}')
            else:
                print(f'Message {idx + 1} has no text')
        else:
            print(f'Message {idx + 1} is not a dictionary')

# Read messages from stdin (sent from Node.js)
if __name__ == '__main__':
    data = sys.stdin.read()  # Reading input from stdin
    messages = json.loads(data)  # Parse JSON string to Python list of objects
    text_to_speech(messages)  # Convert to speech

import sys
import os
import json
from gtts import gTTS


AUDIO_FOLDER = r'D:\Code\Web Development\project\Full stack\Avatarify\server\audio'


if not os.path.exists(AUDIO_FOLDER):
    os.makedirs(AUDIO_FOLDER)


def text_to_speech(messages):
    for idx, message in enumerate(messages):
        if isinstance(message, dict):
            text = message.get('message', '')
            if text:

                tts = gTTS(text, lang='en')

                audio_file = os.path.join(
                    AUDIO_FOLDER, f'message_{idx + 1}.mp3')
                tts.save(audio_file)

                print(f'Audio file saved: {audio_file}')
            else:
                print(f'Message {idx + 1} has no text')
        else:
            print(f'Message {idx + 1} is not a dictionary')


if __name__ == '__main__':
    data = sys.stdin.read()
    messages = json.loads(data)
    text_to_speech(messages)

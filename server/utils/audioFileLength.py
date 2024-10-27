import os
from mutagen.mp3 import MP3


def get_max_audio_length(audio_folder):
    max_length = 0
    audio_files = [f for f in os.listdir(audio_folder) if f.endswith('.mp3')]

    for audio_file in audio_files:
        audio_path = os.path.join(audio_folder, audio_file)
        audio = MP3(audio_path)
        duration = audio.info.length
        print(f"{audio_file}: {duration:.2f} seconds")
        if duration > max_length:
            max_length = duration

    return max_length


if __name__ == "__main__":
    audio_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\audio'
    max_length = get_max_audio_length(audio_folder)
    print(f"\nMaximum audio length: {max_length:.2f} seconds")

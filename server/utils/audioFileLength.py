import os
from mutagen.mp3 import MP3

def get_max_audio_length(audio_folder):
    max_length = 0  # Initialize max_length to zero
    audio_files = [f for f in os.listdir(audio_folder) if f.endswith('.mp3')]  # List all mp3 files

    for audio_file in audio_files:
        audio_path = os.path.join(audio_folder, audio_file)  # Get the full path of the audio file
        audio = MP3(audio_path)  # Load the audio file
        duration = audio.info.length  # Get the length in seconds
        print(f"{audio_file}: {duration:.2f} seconds")  # Print the duration of the audio file
        if duration > max_length:
            max_length = duration  # Update max_length if the current duration is greater

    return max_length  # Return the maximum length found

if __name__ == "__main__":
    audio_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\audio'  # Change this to your actual audio folder path
    max_length = get_max_audio_length(audio_folder)  # Get the maximum length
    print(f"\nMaximum audio length: {max_length:.2f} seconds")  # Print the maximum length

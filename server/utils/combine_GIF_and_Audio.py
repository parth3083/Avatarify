import os
from moviepy.editor import VideoFileClip, AudioFileClip, concatenate_videoclips

def create_video_with_audio(gif_path, audio_path, output_path):
    # Load the GIF as a video clip
    gif_clip = VideoFileClip(gif_path)
    gif_duration = gif_clip.duration  # Get the duration of the GIF

    # Load the audio file as an audio clip
    audio_clip = AudioFileClip(audio_path)
    audio_duration = audio_clip.duration  # Get the duration of the audio

    # Check if GIF needs to be repeated
    if gif_duration < audio_duration:
        # Calculate how many times to repeat the GIF
        num_repeats = int(audio_duration // gif_duration) + 1
        gif_clip = concatenate_videoclips([gif_clip] * num_repeats)

    # Set the audio of the GIF clip to the audio clip
    video_with_audio = gif_clip.set_audio(audio_clip)

    # Create the output video path
    video_name = os.path.splitext(os.path.basename(audio_path))[0] + '.mp4'  # Use audio file name for video
    output_video_path = os.path.join(output_path, video_name)

    # Write the final video file
    video_with_audio.write_videofile(output_video_path, codec='libx264')

    # Close the clips
    gif_clip.close()
    audio_clip.close()

def combine_gif_with_audio(gif_folder, audio_folder, output_folder):
    # Create the output folder if it doesn't exist
    os.makedirs(output_folder, exist_ok=True)

    # Get the list of GIF files in the folder
    gif_files = [f for f in os.listdir(gif_folder) if f.lower().endswith(('.gif','.png','.jpg','.jpeg'))]

    # Get the list of audio files in the folder
    audio_files = [f for f in os.listdir(audio_folder) if f.lower().endswith(('.mp3', '.wav', '.aac'))]

    # Process each audio file
    for audio_file in audio_files:
        audio_path = os.path.join(audio_folder, audio_file)

        # Assuming there is only one GIF to use, we'll take the first one
        if gif_files:
            gif_path = os.path.join(gif_folder, gif_files[0])  # Get the first GIF path
            create_video_with_audio(gif_path, audio_path, output_folder)

if __name__ == "__main__":
    gif_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\GIF'  # Path to the folder containing GIFs
    audio_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\audio'  # Path to the folder containing audio files
    output_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\output'  # Path where the output videos will be saved

    # Combine GIF with all audio files
    combine_gif_with_audio(gif_folder, audio_folder, output_folder)

    print(f"Videos created and saved in: {output_folder}")
# import os
# from moviepy.editor import VideoFileClip, AudioFileClip, concatenate_videoclips

# def create_video_with_audio(gif_path, audio_path, output_path):
#     # Load the GIF as a video clip
#     gif_clip = VideoFileClip(gif_path)
#     gif_duration = gif_clip.duration  # Get the duration of the GIF

#     # Load the audio file as an audio clip
#     audio_clip = AudioFileClip(audio_path)
#     audio_duration = audio_clip.duration  # Get the duration of the audio

#     # Check if GIF needs to be repeated
#     if gif_duration < audio_duration:
#         # Calculate how many times to repeat the GIF
#         num_repeats = int(audio_duration // gif_duration) + 1
#         gif_clip = concatenate_videoclips([gif_clip] * num_repeats)

#     # Set the audio of the GIF clip to the audio clip
#     video_with_audio = gif_clip.set_audio(audio_clip)

#     # Create the output video path
#     video_name = os.path.splitext(os.path.basename(audio_path))[0] + '.mp4'  # Use audio file name for video
#     output_video_path = os.path.join(output_path, video_name)

#     # Write the final video file
#     video_with_audio.write_videofile(output_video_path, codec='libx264')

#     # Close the clips
#     gif_clip.close()
#     audio_clip.close()

# def combine_gif_with_audio(gif_folder, audio_folder, output_folder, image_filename):
#     # Create the output folder if it doesn't exist
#     os.makedirs(output_folder, exist_ok=True)

#     # Get the list of audio files in the folder
#     audio_files = [f for f in os.listdir(audio_folder) if f.lower().endswith(('.mp3', '.wav', '.aac'))]

#     # Extract base name for GIF search
#     base_name = os.path.splitext(image_filename)[0]  # Get the base name without extension

#     # Search for corresponding GIF files
#     gif_files = [f for f in os.listdir(gif_folder) if f.lower().startswith(base_name) and f.lower().endswith('.gif')]

#     # Process each audio file
#     for audio_file in audio_files:
#         audio_path = os.path.join(audio_folder, audio_file)

#         # Assuming there is a corresponding GIF
#         if gif_files:
#             gif_path = os.path.join(gif_folder, gif_files[0])  # Get the first matching GIF path
#             create_video_with_audio(gif_path, audio_path, output_folder)

# if __name__ == "__main__":
#     gif_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\GIF'  # Path to the folder containing GIFs
#     audio_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\audio'  # Path to the folder containing audio files
#     output_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\output'  # Path where the output videos will be saved
#     image_filename = "your_uploaded_image_file.jpg"  # Update this with the actual uploaded image filename

#     # Combine GIF with all audio files based on the uploaded image
#     combine_gif_with_audio(gif_folder, audio_folder, output_folder, image_filename)

#     print(f"Videos created and saved in: {output_folder}")

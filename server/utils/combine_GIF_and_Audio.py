import os
from moviepy.editor import VideoFileClip, AudioFileClip, concatenate_videoclips


def create_video_with_audio(gif_path, audio_path, output_path):

    gif_clip = VideoFileClip(gif_path)
    gif_duration = gif_clip.duration

    audio_clip = AudioFileClip(audio_path)
    audio_duration = audio_clip.duration

    if gif_duration < audio_duration:

        num_repeats = int(audio_duration // gif_duration) + 1
        gif_clip = concatenate_videoclips([gif_clip] * num_repeats)

    video_with_audio = gif_clip.set_audio(audio_clip)

    video_name = os.path.splitext(os.path.basename(audio_path))[0] + '.mp4'
    output_video_path = os.path.join(output_path, video_name)

    video_with_audio.write_videofile(output_video_path, codec='libx264')

    gif_clip.close()
    audio_clip.close()


def combine_gif_with_audio(gif_folder, audio_folder, output_folder):

    os.makedirs(output_folder, exist_ok=True)

    gif_files = [f for f in os.listdir(gif_folder) if f.lower().endswith(
        ('.gif', '.png', '.jpg', '.jpeg'))]

    audio_files = [f for f in os.listdir(
        audio_folder) if f.lower().endswith(('.mp3', '.wav', '.aac'))]

    for audio_file in audio_files:
        audio_path = os.path.join(audio_folder, audio_file)

        if gif_files:
            gif_path = os.path.join(gif_folder, gif_files[0])
            create_video_with_audio(gif_path, audio_path, output_folder)


if __name__ == "__main__":
    gif_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\GIF'
    audio_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\audio'
    output_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\output'

    combine_gif_with_audio(gif_folder, audio_folder, output_folder)

    print(f"Videos created and saved in: {output_folder}")

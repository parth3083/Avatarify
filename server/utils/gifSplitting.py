from PIL import Image
import os


gif_path = r'D:\Code\Web Development\project\Full stack\Avatarify\server\uploads\woman.gif'
output_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\resources\woman'


os.makedirs(output_folder, exist_ok=True)


with Image.open(gif_path) as gif:
    frame_count = min(100, gif.n_frames)

    for frame_index in range(frame_count):

        gif.seek(frame_index)

        frame = gif.copy()
        frame_path = os.path.join(
            output_folder, f"frame_{frame_index + 1}.png")
        frame.save(frame_path, format="PNG")

print("Frames saved successfully!")

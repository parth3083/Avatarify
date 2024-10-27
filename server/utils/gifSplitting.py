from PIL import Image
import os

# Paths for the GIF file and output folder
gif_path = r'D:\Code\Web Development\project\Full stack\Avatarify\server\uploads\woman.gif'  # Replace with your GIF path
output_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\resources\woman'  # Replace with your output folder path

# Ensure the output folder exists
os.makedirs(output_folder, exist_ok=True)

# Open the GIF file
with Image.open(gif_path) as gif:
    frame_count = min(100, gif.n_frames)  # Limit to 16 frames or fewer if GIF has less frames
    
    for frame_index in range(frame_count):
        # Seek to the specific frame
        gif.seek(frame_index)
        
        # Save the frame as a new image
        frame = gif.copy()
        frame_path = os.path.join(output_folder, f"frame_{frame_index + 1}.png")
        frame.save(frame_path, format="PNG")

print("Frames saved successfully!")

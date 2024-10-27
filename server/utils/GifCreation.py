import os
import re
from PIL import Image

def create_gif(image_folder, output_folder, gif_name="output.gif", duration=100):
    # Get list of all image file paths in the folder and sort them numerically
    images = []
    for filename in os.listdir(image_folder):
        file_path = os.path.join(image_folder, filename)
        if filename.endswith((".png", ".jpg", ".jpeg")) and os.path.isfile(file_path):
            images.append((file_path, int(re.findall(r'\d+', filename)[-1])))  # Extract number from filename

    # Sort images by the extracted number
    images.sort(key=lambda x: x[1])
    image_files = [Image.open(img[0]) for img in images]

    # Check if there are images to process
    if image_files:
        # Save images as a GIF
        gif_path = os.path.join(output_folder, gif_name)
        image_files[0].save(gif_path, save_all=True, append_images=image_files[1:], duration=duration, loop=0)
        print(f"GIF created and saved as: {gif_path}")

        # Delete all images in the folder
        for img_path, _ in images:
            os.remove(img_path)
        print("All images deleted from the folder.")
    else:
        print("No images found in the folder.")

# Define paths
image_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\gif-images'  # Replace with path to your images folder
output_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\GIF'  # Replace with path to your output folder

# Ensure the output folder exists
os.makedirs(output_folder, exist_ok=True)

# Create GIF
create_gif(image_folder, output_folder, gif_name="combined_images.gif", duration=100)


import os
from PIL import Image

def duplicate_images(audio_length, image_folder, output_image_folder):
    # Calculate the number of duplications needed based on audio length (assuming each image represents 1 second)
    num_duplicates = int(audio_length)  # Assuming each image corresponds to 1 second of audio
    
    # Create the output folder if it doesn't exist
    os.makedirs(output_image_folder, exist_ok=True)

    # Get the list of images in the folder
    image_files = [f for f in os.listdir(image_folder) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif'))]

    for image_file in image_files:
        image_path = os.path.join(image_folder, image_file)  # Full path to the image
        for i in range(num_duplicates):
            # Duplicate the image
            img = Image.open(image_path)
            img.save(os.path.join(output_image_folder, f"{os.path.splitext(image_file)[0]}_{i+1}.png"))

def create_gif(image_folder, gif_output_folder, gif_name):
    # Get the list of duplicated images
    image_files = [f for f in os.listdir(image_folder) if f.lower().endswith('.png')]
    images = [Image.open(os.path.join(image_folder, img_file)) for img_file in sorted(image_files)]

    # Create the GIF
    gif_path = os.path.join(gif_output_folder, gif_name)
    images[0].save(gif_path, save_all=True, append_images=images[1:], duration=100, loop=0)  # 100ms duration per frame

def delete_duplicated_images(image_folder):
    # Get the list of duplicated images
    for file in os.listdir(image_folder):
        file_path = os.path.join(image_folder, file)
        if os.path.isfile(file_path):
            os.remove(file_path)  # Delete the file

if __name__ == "__main__":
    audio_length = 10  # Length of audio in seconds
    image_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\uploads'  # Path to the folder containing original images
    output_image_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\gif-images'  # Path where duplicated images will be stored
    gif_output_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\GIF'  # Path where the GIF will be saved
    gif_name = 'output.gif'  # Name of the output GIF file

    # Step 1: Duplicate images based on audio length
    duplicate_images(audio_length, image_folder, output_image_folder)

    # Step 2: Create GIF from duplicated images
    create_gif(output_image_folder, gif_output_folder, gif_name)

    # Step 3: Delete duplicated images
    delete_duplicated_images(output_image_folder)

    print(f"Duplicated images are saved in: {output_image_folder}")
    print(f"GIF created and saved in: {gif_output_folder}/{gif_name}")

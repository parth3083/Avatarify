import os
from PIL import Image


def duplicate_images(audio_length, image_folder, output_image_folder):

    num_duplicates = int(audio_length)

    os.makedirs(output_image_folder, exist_ok=True)

    image_files = [f for f in os.listdir(image_folder) if f.lower().endswith(
        ('.png', '.jpg', '.jpeg', '.gif'))]

    for image_file in image_files:
        image_path = os.path.join(image_folder, image_file)
        for i in range(num_duplicates):

            img = Image.open(image_path)
            img.save(os.path.join(output_image_folder,
                     f"{os.path.splitext(image_file)[0]}_{i+1}.png"))


def create_gif(image_folder, gif_output_folder, gif_name):

    image_files = [f for f in os.listdir(
        image_folder) if f.lower().endswith('.png')]
    images = [Image.open(os.path.join(image_folder, img_file))
              for img_file in sorted(image_files)]

    gif_path = os.path.join(gif_output_folder, gif_name)
    images[0].save(gif_path, save_all=True,
                   append_images=images[1:], duration=100, loop=0)


def delete_duplicated_images(image_folder):

    for file in os.listdir(image_folder):
        file_path = os.path.join(image_folder, file)
        if os.path.isfile(file_path):
            os.remove(file_path)


if __name__ == "__main__":
    audio_length = 10
    image_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\uploads'
    output_image_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\gif-images'
    gif_output_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\GIF'
    gif_name = 'output.gif'

    duplicate_images(audio_length, image_folder, output_image_folder)

    create_gif(output_image_folder, gif_output_folder, gif_name)

    delete_duplicated_images(output_image_folder)

    print(f"Duplicated images are saved in: {output_image_folder}")
    print(f"GIF created and saved in: {gif_output_folder}/{gif_name}")

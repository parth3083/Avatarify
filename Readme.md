# 🎨 Project Description: Avatarify : An Avatar Generator

## 🌟 Overview
The **Avatarify** enables users to create unique and personalized avatars by converting text messages into speech and integrating them into engaging videos. With a user-friendly interface, individuals can complete their profiles, input multiple messages, and select their preferred method of avatar presentation.

## 🛤️ User Journey

1. **👤 Profile Completion:** 
   - Users begin by filling out their profiles to set up their accounts.
  
2. **💬 Message Input:**
   - After completing their profiles, users are redirected to a dedicated page where they can input multiple messages.
   - Each message is transformed into speech using the **Google Text-to-Speech (gTTS)** library, providing an audio representation of their text.

3. **🖼️ Avatar Creation:**
   - Following message input, users proceed to the avatar creation page where they can choose between two options:
     - **Option 1: Static Image**
       - Users upload a static image that serves as their avatar. The audio of their speech is added as a background, creating a simple yet effective presentation.
     - **Option 2: Dynamic GIF**
       - Users can opt for a more dynamic experience by utilizing a face-swapping technique to create an avatar with an existing GIF. The resulting video synchronizes their speech with the animated visuals.

## 📽️ Output
- The final output showcases the generated video alongside the latest message. 
- Videos are played at specific times designated by the user, allowing for scheduled presentations.
- Users can plan messages for specific dates, with only the most imminent message displayed on the interface.

## 🛠️ Tech Stack

- **Frontend:** 
  - Framework: **Next.js 14**
  - Language: **TypeScript**
  - Key Packages:
    - `@clerk/nextjs`: For authentication and user management
    - `axios`: For handling HTTP requests
    - `tailwindcss`: For modern styling

- **Backend:** 
  - Framework: **Node.js** with **Express.js**
  - Language: **JavaScript**
  - Database: **MongoDB** (utilizing **Mongoose ORM**)
  - Key Packages:
    - `child_process`: To spawn Python processes for multimedia tasks
    - `cloudinary`: For media storage and management
    - `multer`: For handling file uploads

- **Python Libraries Used:** 
  - `gTTS`: To convert text into speech
  - `moviepy`: For video editing and integrating audio
  - `opencv`: For image processing tasks
  - `insightface` and `deepface`: For advanced face detection and analysis
  - `buffalo_l`: Leveraged for precise face detection
  - `inswapper_128.onnx`: Utilized for accurate face-swapping

## 🚀 Key Features

- **🔊 Text-to-Speech Conversion:** 
  - Seamlessly converts user-inputted messages into high-quality speech audio, enhancing user engagement.

- **🖼️ Avatar Options:** 
  - Users can select between a static image paired with audio or an animated GIF featuring face-swapping technology.

- **⏰ Scheduled Messages:** 
  - Users can easily set specific times for their messages to be played, ensuring timely delivery and engagement.

- **📩 Multiple Message Support:** 
  - The platform allows users to input multiple messages; however, only the latest or most relevant message is displayed based on the scheduled time.
    
## ⚒️ Work Flow
![Hackathon](https://github.com/user-attachments/assets/9307cf91-78d5-472d-b1b0-7bfd4e7d91e9)


## 🎯 Conclusion
The **Avatar Generation** project combines cutting-edge technology with creative expression, enabling users to bring their messages to life through personalized avatars. With an intuitive design and powerful features, this project offers a unique experience for users looking to enhance their communication.



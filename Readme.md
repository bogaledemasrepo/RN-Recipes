# 🍳 RN-Recipes | Modern Recipe Discovery

RN-Recipes is a premium, high-performance recipe application built with **React Native** and **Expo**. It provides a seamless user experience for exploring global cuisines, featuring high-fidelity UI animations, YouTube integration, and a native sharing system.

---

## ✨ Key Features

* **Premium UI/UX:** Modern "card-stack" aesthetics with a focus on typography, spacing, and visual hierarchy.
* **Dynamic Discovery:** Fetches real-time data from TheMealDB API.
* **Interactive Details:** Full-screen recipe views with ingredient lists, step-by-step instructions, and nutrient stats.
* **YouTube Integration:** Built-in video tutorials using `react-native-youtube-iframe` for a seamless learning experience.
* **Personalized Favorites:** Save favorite meals locally using a global Context API.
* **Native Sharing:** Share recipe links instantly via the system's native share sheet.
* **Adaptive Design:** Fully optimized for both iOS and Android with smooth transitions.

---

## 🚀 Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React Native / Expo** | Cross-platform mobile framework |
| **TypeScript** | Static typing for robust code |
| **Context API** | Global state management |
| **Expo Vector Icons** | Premium iconography (Ionicons/Material) |
| **React Navigation** | Stack-based screen transitions |
| **TheMealDB API** | External data source for global recipes |

---

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [https://github.com/bogaledemasrepo/RN-Recipes.git](https://github.com/bogaledemasrepo/RN-Recipes.git)
   cd RN-Recipes 
   ```
2. **Install dependencies**
    ```bash
    npm install | bun install

    ```
3. **Start the development server**
    ```bash
    npm run start | bun run start 
    
    ```


## 📁 Project Structure
    Plaintext

    src/
    ┣ components/       # Reusable UI (ListHeader, EmptyState, SuccessToast)
    ┣ config/           # Application native config
    ┣ context/          # Global state (RecipeContext)
    ┣ screens/          # Main Discovery Screen & Detail Screen
    ┣ utils/            # Logic for parsing ingredients & YouTube IDs
    ┣ types/            # Type definition for type safety 
    ┗ assets/           # Local images and branding

## 🧪 Implementation Highlights

   - Smart Ingredient Parsing: Custom utility that transforms flat API responses into structured data.

   - Responsive Video Player: Dynamic calculation of video heights to maintain a perfect 16:9 aspect ratio across all devices.

   - Animated Feedback: Hand-crafted, non-blocking "Success Toast" notifications using the Animated API.

   - Contextual UI: Floating header buttons with blur effects for a modern "Glassmorphism" feel.

## 🤝 Contact

Your Name GitHub: @bogaledemasrepo

Email: bogidemas@gmail.com
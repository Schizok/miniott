# Mini OTT Platform - Research & Design

## 1. Core Features
*   **Adaptive Bitrate (ABR) Streaming**: The player automatically switches quality (e.g., 360p → 1080p) based on bandwidth.
*   **DaisyUI Interface**: A beautiful, themeable UI using Tailwind CSS + DaisyUI components.
*   **Multi-Video Support**: The architecture will support multiple videos (movies/episodes).

## 2. ABR Strategy (HLS)
To achieve ABR, we need to transcode the input video into multiple "renditions" (variants) and create a "Master Playlist" that references them.

**Proposed Ladder:**
| Quality | Resolution | Bitrate (Video) | Audio |
| :--- | :--- | :--- | :--- |
| **Low** | 640x360 | 800k | 96k |
| **Mid** | 1280x720 | 2500k | 128k |
| **High** | 1920x1080 | 5000k | 192k |

**FFmpeg Logic:**
We will use `filter_complex` to split the input into 3 streams, scale them, and encode them simultaneously.
Output structure:
```
content/
  movie1/
    master.m3u8      # Lists the variants
    v360/
      playlist.m3u8
      segment0.ts...
    v720/
      playlist.m3u8
      segment0.ts...
    v1080/
      playlist.m3u8
      segment0.ts...
```

## 3. UI Design (DaisyUI)
We will use the **"Cyberpunk"** or **"Luxury"** theme from DaisyUI to make it stand out.

**Pages:**
1.  **Home (`index.html`)**:
    *   **Hero Carousel**: Featured content with auto-play trailer background.
    *   **Media Grid**: "Trending Now", "New Releases" using DaisyUI `card` components with hover effects.
2.  **Player (`player.html`)**:
    *   **Cinematic Mode**: Dark background, full-width player.
    *   **Quality Selector**: Custom UI control to switch HLS levels manually (optional, hls.js handles auto).
    *   **Related Content**: Sidebar or bottom grid.

## 4. Tech Stack
*   **Backend**: Python `http.server` (simple, effective).
*   **Transcoding**: Python script wrapping FFmpeg.
*   **Frontend**: HTML5 + Tailwind CSS (CDN) + DaisyUI (CDN) + hls.js.

## 5. User Inputs
The user mentioned "three videos". We will create a folder `assets/inputs/` where they can drop these files. The script will iterate through them.

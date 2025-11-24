# Mini OTT Platform (React + Python)

A modern, adaptive bitrate (ABR) video streaming platform built with React, Vite, Tailwind CSS, and Python.

![Sintel](mini-ott-web/public/posters/sintel.jpg)

## Features

*   **Adaptive Bitrate Streaming (HLS)**: Automatically adjusts video quality (1080p, 720p, 360p) based on network conditions.
*   **Modern UI**: Built with React, Tailwind CSS, and DaisyUI for a premium "Netflix-like" experience.
*   **Custom Player**: Integrated `hls.js` player with manual quality selection controls.
*   **Backend**: Lightweight Python HTTP server to serve HLS segments.

## Project Structure

*   `mini-ott-web/`: React frontend application.
*   `server.py`: Python HTTP server (CORS enabled) to serve video content.
*   `transcode_abr.py`: Python script to transcode raw videos into HLS streams using FFmpeg.
*   `content/`: (Ignored) Stores the generated HLS playlists and video segments.

## Prerequisites

*   **Node.js** (v18+)
*   **Python** (v3.8+)
*   **FFmpeg**: Required for transcoding (place `ffmpeg.exe` in the root or add to PATH).

## Setup & Run

### 1. Start the Backend (Content Server)

The Python server hosts the HLS video files on port `8000`.

```bash
# From the project root
python server.py
```

### 2. Start the Frontend (React App)

The React application runs on port `5173`.

```bash
cd mini-ott-web
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Adding New Content

1.  Place your source video (e.g., `movie.mp4`) in `assets/inputs/`.
2.  Run the transcoding script:
    ```bash
    python transcode_abr.py
    ```
3.  Update `mini-ott-web/src/data/movies.js` with the new movie details and ID.

## License

MIT

import os
import subprocess
import sys
import shutil

# Configuration
INPUT_DIR = os.path.join("assets", "inputs")
OUTPUT_DIR = "content"
FFMPEG_PATH = ".\\ffmpeg.exe"  # Using the portable version we downloaded

# ABR Ladder
VARIANTS = [
    {"name": "360p", "width": 640, "height": 360, "bitrate": "800k", "audio_bitrate": "96k"},
    {"name": "720p", "width": 1280, "height": 720, "bitrate": "2500k", "audio_bitrate": "128k"},
    {"name": "1080p", "width": 1920, "height": 1080, "bitrate": "5000k", "audio_bitrate": "192k"},
]

def transcode_file(filename):
    input_path = os.path.join(INPUT_DIR, filename)
    video_name = os.path.splitext(filename)[0]
    video_output_dir = os.path.join(OUTPUT_DIR, video_name)

    if not os.path.exists(video_output_dir):
        os.makedirs(video_output_dir)

    print(f"Processing {filename}...")

    # 1. Generate Variants
    # We will generate each variant in a separate pass for simplicity and robustness,
    # though filter_complex can do it in one go (but is harder to debug).
    
    master_playlist_content = "#EXTM3U\n#EXT-X-VERSION:3\n"

    for variant in VARIANTS:
        variant_dir = os.path.join(video_output_dir, variant["name"])
        if not os.path.exists(variant_dir):
            os.makedirs(variant_dir)
        
        output_playlist = os.path.join(variant_dir, "playlist.m3u8")
        
        cmd = [
            FFMPEG_PATH, "-y",
            "-i", input_path,
            "-vf", f"scale={variant['width']}:{variant['height']}",
            "-c:v", "libx264", "-b:v", variant["bitrate"], "-maxrate", variant["bitrate"], "-bufsize", str(int(variant["bitrate"][:-1])*2)+"k",
            "-c:a", "aac", "-b:a", variant["audio_bitrate"],
            "-hls_time", "10", "-hls_playlist_type", "vod",
            "-hls_segment_filename", os.path.join(variant_dir, "segment%03d.ts"),
            output_playlist
        ]
        
        print(f"  -> Generating {variant['name']}...")
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        
        # Add to master playlist
        # Bandwidth is roughly bitrate * 1000
        bandwidth = int(variant["bitrate"][:-1]) * 1000
        master_playlist_content += f"#EXT-X-STREAM-INF:BANDWIDTH={bandwidth},RESOLUTION={variant['width']}x{variant['height']}\n"
        master_playlist_content += f"{variant['name']}/playlist.m3u8\n"

    # 2. Write Master Playlist
    with open(os.path.join(video_output_dir, "master.m3u8"), "w") as f:
        f.write(master_playlist_content)
    
    print(f"Done! Master playlist at {os.path.join(video_output_dir, 'master.m3u8')}")

def main():
    if not os.path.exists(INPUT_DIR):
        print(f"Input directory {INPUT_DIR} not found.")
        return

    files = [f for f in os.listdir(INPUT_DIR) if f.endswith((".mp4", ".mov", ".mkv"))]
    
    if not files:
        print("No video files found in assets/inputs/")
        return

    for f in files:
        transcode_file(f)

if __name__ == "__main__":
    main()

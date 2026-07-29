## Overview

Auto File Organizer automatically organizes files in a selected folder (e.g., `Downloads`) into categories such as Images, PDFs, Videos, and more. Once set up, it runs in the background and requires no manual intervention.

**Example:**
_Before_

```
Downloads/
  photo.jpg
  report.pdf
  video.mp4
```

_After_

```
Downloads/
  Images/photo.jpg
  PDFs/report.pdf
  Videos/video.mp4
```

## Problem

Over time, folders like `Downloads` or `Desktop` become cluttered with miscellaneous files, making it hard to find what you need. Manually sorting these files into respective folders is tedious and easily forgotten.

## Solution

An automated, event-driven background service that monitors your chosen folders and instantly categorizes newly added files into organized subdirectories based on their file extensions.

## Features

- Automatically sorts files into categorized folders
- Creates folders if they do not exist
- Safely renames duplicate files (e.g., `file.jpg` → `file(1).jpg`)
- Ignores temporary/incomplete download files (`.tmp`, `.crdownload`, etc.)
- Waits until downloads are complete before organizing
- Only top-level files in the folder are organized

## Tech Stack

- **Language:** Python
- **Packaging:** PyInstaller
- **Service Management:** `systemd` (Linux)

## Architecture

The application uses an event-driven file watcher to monitor directory changes in real-time. When a new file is detected (and confirmed fully downloaded), a rules engine determines its destination category, and a file mover relocates it safely. It operates seamlessly as a background service.

## Performance

By utilizing event-driven file system notifications rather than continuous polling, Auto File Organizer maintains extremely low CPU and memory usage, ensuring it doesn't impact your system's performance.

## Deployment

Download the latest Linux binary from the **Releases** page.

### Quick Setup (Linux)

After downloading:

```bash
cd ~/Downloads
chmod +x organizer-linux
./organizer-linux --install
organizer --install-autostart
```

The organizer will now run automatically in the background.

### Use a Different Folder

By default, the organizer watches your `Downloads` folder. To organize another folder (e.g., `Desktop`):

```bash
organizer --install-autostart --path ~/Desktop
```

### Common Commands

- **Check status:** `organizer --status`
- **Start:** `organizer --start`
- **Stop:** `organizer --stop`
- **Uninstall:**
  ```bash
  organizer --stop
  organizer --uninstall-autostart
  rm ~/.local/bin/organizer
  ```

### Platform Support

- Linux: ✅ Available
- Windows: ⏳ Coming soon
- macOS: ⏳ Coming soon

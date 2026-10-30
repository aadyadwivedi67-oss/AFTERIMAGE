# AFTERIMAGE
### An Archive for Things That Refuse to Disappear

**AFTERIMAGE** is an interactive digital archive built around the idea that some memories, stories, and messages deserve to remain even after their original world has disappeared.

Inspired by analog horror, abandoned digital systems, forgotten archives, and the Día de los Muertos tradition, AFTERIMAGE transforms a website into an eerie archive of things left behind.

It combines browser-based open-source AI with personal memory storage and interactive storytelling to create an experience that feels like exploring a forgotten computer system.

---

## Project Overview

Most websites are designed to provide information or complete tasks. AFTERIMAGE takes a different approach.

It creates a fictional digital archive where visitors can:

- Interact with an AI-powered ghost terminal.
- Store personal memories in a digital vault.
- Create digital ofrendas dedicated to people, memories, or things they want to remember.
- Discover mysterious fictional radio transmissions.

The experience is designed to feel like opening an old computer that still remembers things it should have forgotten.

## Features

### 1. Ghost Terminal

An interactive AI-powered terminal that generates eerie fictional story continuations based on user prompts.

It uses the open-weight DistilGPT-2 model through Transformers.js, allowing AI inference directly in the browser.

### 2. Memory Vault

A personal digital archive where visitors can save their thoughts, memories, and notes.

Features include:
- Add and store memories.
- View saved entries.
- Delete individual entries.
- Export memories as a JSON file.

Memories are stored locally in the browser using localStorage.

### 3. Digital Ofrenda

Inspired by the Día de los Muertos tradition, this feature lets visitors create a digital tribute.

Users can add:
- A name or title.
- Favorite memories or things associated with it.
- A personal message.

The tribute can be printed and preserved.

### 4. Lost Frequencies

A collection of fictional radio transmissions that visitors can discover.

Each transmission is designed to feel like a message recovered from a forgotten broadcast.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Website structure |
| CSS3 | Visual design and animations |
| JavaScript | Interactions and application logic |
| Transformers.js | Browser-based AI inference |
| DistilGPT-2 | Open-weight language model |
| localStorage | Local memory and tribute storage |

## Open-Source AI

AFTERIMAGE uses **DistilGPT-2**, an open-weight language model, through the Transformers.js library.

The model runs directly in the browser rather than relying on a paid external AI API.

This approach makes the project:
- Accessible without an API key.
- Less dependent on centralized AI services.
- Easier to experiment with and customize.
- More privacy-conscious because prompts are processed in the browser.

The initial model download requires an internet connection. After the required assets are cached, offline operation may be possible depending on browser caching and available resources.

## Why Open Innovation Matters

AFTERIMAGE explores how open-source AI can make creative technology more accessible.

Using open models and browser-based inference means developers can experiment with AI without necessarily depending on expensive APIs or centralized services.

Open innovation also makes it easier for others to inspect, modify, extend, and build upon the project.

For a project centered on memories and personal archives, reducing unnecessary dependence on external services is particularly important.

## Getting Started

### Requirements

- A modern web browser.
- Visual Studio Code or another code editor.
- Internet connection for the initial AI model download.
- Live Server extension for Visual Studio Code.

### Installation

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Make sure the following files are in the same folder:

```text
AFTERIMAGE/
|
|-- index.html
|-- style.css
|-- script.js
|-- README.md
```

4. Install the Live Server extension if you have not already.
5. Right-click `index.html`.
6. Select **Open with Live Server**.

The website should now open in your browser.

Do not open the HTML file directly using `file://`, because the JavaScript module imports require a local development server.

## Privacy and Data Storage

AFTERIMAGE stores memories and tributes using the browser's localStorage.

This means:
- Entries remain in the browser where they were created.
- They are not automatically synchronized across devices.
- Clearing browser data may permanently remove saved entries.
- Users should export important memories as backups.

The localStorage data is not encrypted, so avoid storing passwords, confidential information, or sensitive personal details.

The AI model is downloaded from its hosting source when needed. The project does not require a custom AI backend or paid API key.

## Future Improvements

Possible future additions include:

- More open-weight language models.
- Improved AI-generated archive entries.
- Search and filtering in the Memory Vault.
- Importing previously exported memory archives.
- More interactive archive discoveries.
- Improved offline support.
- Additional customization options.

## Project Philosophy

AFTERIMAGE is built around a simple idea:

Not everything that disappears is truly gone.

Some things remain in old messages, forgotten files, saved memories, and stories that nobody finished telling.

This project explores that idea through open-source AI and an interactive digital archive.

## License

This project is intended to be open source. Add an MIT License file to the repository if you choose to distribute it under the MIT License.

## Project Details

**Project Name:** AFTERIMAGE

**Category:** Open-Source AI / Creative Technology

**Core Technologies:** JavaScript, Transformers.js, DistilGPT-2

**AI Approach:** Browser-based inference using an open-weight model

**Backend:** No custom backend required

**API Key:** Not required

**Ollama:** Not required
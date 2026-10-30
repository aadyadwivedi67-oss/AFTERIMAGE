
/* ==========================================
   AFTERIMAGE — THE ARCHIVE ENGINE
   Open-source AI / Browser-only application
========================================== */

const $ = (selector) => document.querySelector(selector);

const STORAGE_KEY = "afterimage_memories_v1";
const TRIBUTE_KEY = "afterimage_tributes_v1";


// ==========================================
// 1. MOBILE NAVIGATION
// ==========================================

const menuToggle = $("#menuToggle");
const navigation = $("#navigation");

menuToggle.addEventListener("click", () => {
    navigation.classList.toggle("open");
});

document.querySelectorAll(".navigation a").forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");
    });
});


// ==========================================
// 2. MEMORY VAULT
// ==========================================

let memories = loadMemories();

function loadMemories() {
    try {
        const saved = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
        );

        return Array.isArray(saved) ? saved : [];
    } catch (error) {
        console.error("Archive could not be read:", error);
        return [];
    }
}

function storeMemories() {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(memories)
        );
        return true;
    } catch (error) {
        alert("Storage is full or unavailable. Export your archive first.");
        return false;
    }
}

function renderMemories() {

    const list = $("#memoryList");

    $("#memoryCount").textContent =
        String(memories.length).padStart(2, "0");

    list.replaceChildren();

    if (memories.length === 0) {

        const empty = document.createElement("div");
        empty.className = "empty-state";

        const symbol = document.createElement("span");
        symbol.textContent = "✳";

        const title = document.createElement("p");
        title.textContent = "THE ARCHIVE IS EMPTY.";

        const subtitle = document.createElement("small");
        subtitle.textContent = "YOUR FIRST MEMORY IS WAITING.";

        empty.append(symbol, title, subtitle);
        list.appendChild(empty);

        return;
    }

    [...memories].reverse().forEach(memory => {

        const article = document.createElement("article");
        article.className = "memory-entry";

        const title = document.createElement("h3");
        title.textContent = memory.title;

        const author = document.createElement("span");
        author.className = "entry-author";
        author.textContent = "FILED UNDER: " + memory.name;

        const content = document.createElement("p");
        content.textContent = memory.content;

        const date = document.createElement("span");
        date.className = "entry-date";
        date.textContent = memory.date;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-entry";
        deleteButton.textContent = "DELETE RECORD ×";

        deleteButton.addEventListener("click", () => {
            deleteMemory(memory.id);
        });

        article.append(
            title,
            author,
            content,
            date,
            deleteButton
        );

        list.appendChild(article);
    });
}

function deleteMemory(id) {

    const previous = memories;

    memories = memories.filter(memory => memory.id !== id);

    if (!storeMemories()) {
        memories = previous;
        return;
    }

    renderMemories();
}

$("#saveMemory").addEventListener("click", () => {

    const title = $("#memoryTitle").value.trim();
    const name = $("#memoryName").value.trim();
    const content = $("#memoryText").value.trim();

    if (!title || !name || !content) {
        alert("Every archive field needs an entry.");
        return;
    }

    const memory = {
        id: crypto.randomUUID
            ? crypto.randomUUID()
            : String(Date.now()) + Math.random(),

        title,
        name,
        content,

        date: new Date().toLocaleString()
    };

    memories.push(memory);

    if (!storeMemories()) {
        memories.pop();
        return;
    }

    $("#memoryTitle").value = "";
    $("#memoryName").value = "";
    $("#memoryText").value = "";

    renderMemories();

    alert("Memory successfully preserved in the archive.");
});


// ==========================================
// 3. EXPORT MEMORY ARCHIVE
// ==========================================

$("#exportMemories").addEventListener("click", () => {

    if (memories.length === 0) {
        alert("There are no memories to export yet.");
        return;
    }

    const archive = {
        archive: "AFTERIMAGE",
        exported: new Date().toISOString(),
        records: memories
    };

    const file = new Blob(
        [JSON.stringify(archive, null, 2)],
        { type: "application/json" }
    );

    const url = URL.createObjectURL(file);

    const link = document.createElement("a");

    link.href = url;
    link.download = "afterimage-memory-archive.json";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
});

renderMemories();


// ==========================================
// 4. OPEN-WEIGHT AI — GHOST TERMINAL
// ==========================================

let generator = null;
let modelLoading = null;

const modelStatus = $("#modelStatus");
const generateBtn = $("#generateBtn");
const ghostOutput = $("#ghostOutput");

function displayTransmission(label, message) {

    const outputLabel = document.createElement("span");
    outputLabel.className = "output-label";
    outputLabel.textContent = label;

    const paragraph = document.createElement("p");
    paragraph.textContent = message;

    ghostOutput.replaceChildren(outputLabel, paragraph);
}


// Load DistilGPT-2 using Transformers.js.
// No Ollama, API key or AI backend is required.

async function loadGhostModel() {

    if (generator) {
        return generator;
    }

    if (modelLoading) {
        return modelLoading;
    }

    modelLoading = (async () => {

        modelStatus.textContent = "MODEL: DOWNLOADING...";

        try {

            const { pipeline, env } = await import(
                "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2"
            );

            // Keep inference in the browser.
            env.allowLocalModels = false;
            env.allowRemoteModels = true;

            generator = await pipeline(
                "text-generation",
                "Xenova/distilgpt2",
                {
                    progress_callback: (progress) => {

                        if (progress.status === "progress") {

                            const percent = Math.round(
                                progress.progress || 0
                            );

                            modelStatus.textContent =
                                "MODEL: DOWNLOADING " + percent + "%";
                        }

                        if (progress.status === "initiate") {
                            modelStatus.textContent =
                                "MODEL: INITIALIZING...";
                        }
                    }
                }
            );

            modelStatus.textContent = "MODEL: READY";

            return generator;

        } catch (error) {

            generator = null;

            modelStatus.textContent = "MODEL: UNAVAILABLE";

            console.error("Model initialization failed:", error);

            throw error;

        } finally {

            modelLoading = null;

        }

    })();

    return modelLoading;
}


// AI story generation

generateBtn.addEventListener("click", async () => {

    const input = $("#ghostInput").value.trim();

    if (!input) {
        alert("The machine needs a transmission first.");
        return;
    }

    generateBtn.disabled = true;
    generateBtn.textContent = "LISTENING...";

    displayTransmission(
        "[ CONNECTION ESTABLISHED ]",
        "The archive is processing your transmission. The first model download can take a little while..."
    );

    try {

        const ai = await loadGhostModel();

        const prompt =
            "A mysterious fictional ghost story about " +
            input +
            ". The strange thing that happened next was";

        const result = await ai(prompt, {
            max_new_tokens: 100,
            do_sample: true,
            temperature: 0.85,
            top_k: 45,
            repetition_penalty: 1.2,
            return_full_text: false
        });

        let story = result?.[0]?.generated_text?.trim();

        if (!story) {
            throw new Error("The model returned an empty transmission.");
        }

        story = story.replace(/\s+/g, " ");

        displayTransmission(
            "[ TRANSMISSION RECEIVED / DISTILGPT-2 ]",
            story
        );

    } catch (error) {

        console.error(error);

        displayTransmission(
            "[ SIGNAL LOST ]",
            "The open-weight model could not be reached. Check your internet connection, reload the page and try again. Your archive is still available."
        );

    } finally {

        generateBtn.disabled = false;
        generateBtn.textContent = "TRANSMIT ↗";

    }

});


// ==========================================
// 5. DIGITAL OFRENDA
// ==========================================

let tributes = [];

try {
    const savedTributes = JSON.parse(
        localStorage.getItem(TRIBUTE_KEY) || "[]"
    );

    tributes = Array.isArray(savedTributes)
        ? savedTributes
        : [];

} catch {
    tributes = [];
}

function saveTributes() {

    try {
        localStorage.setItem(
            TRIBUTE_KEY,
            JSON.stringify(tributes)
        );

        return true;

    } catch (error) {
        alert("Could not save the tribute in browser storage.");
        return false;
    }
}

$("#createTribute").addEventListener("click", () => {

    const name = $("#tributeName").value.trim();
    const love = $("#tributeLove").value.trim();
    const message = $("#tributeMessage").value.trim();

    if (!name || !love || !message) {
        alert("Please complete all three fields.");
        return;
    }

    const tribute = {
        id: Date.now(),
        name,
        love,
        message,
        date: new Date().toISOString()
    };

    tributes.push(tribute);

    if (!saveTributes()) {
        tributes.pop();
        return;
    }

    $("#displayName").textContent = name;
    $("#displayLove").textContent = "Remembered for loving: " + love;
    $("#displayMessage").textContent = message;

    $("#tributeDisplay").classList.remove("hidden");

    $("#tributeDisplay").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});

$("#printTribute").addEventListener("click", () => {
    window.print();
});


// ==========================================
// 6. LOST FREQUENCIES
// ==========================================

const transmissions = [

    {
        number: "87.04",
        message: "Somewhere, a forgotten photograph is still waiting to be found."
    },

    {
        number: "91.23",
        message: "The old house remembers every person who ever lived there."
    },

    {
        number: "66.09",
        message: "A story does not end just because its last page is turned."
    },

    {
        number: "103.7",
        message: "The archive found a letter with no sender and no date."
    },

    {
        number: "74.11",
        message: "There are entire worlds hidden inside the things we remember."
    },

    {
        number: "88.88",
        message: "A voice from yesterday is still echoing somewhere in the machine."
    },

    {
        number: "52.16",
        message: "Not everything lost wants to be forgotten."
    },

    {
        number: "101.01",
        message: "The last file in the archive has no name."
    }

];

let lastFrequency = -1;

$("#tuneFrequency").addEventListener("click", () => {

    const button = $("#tuneFrequency");
    const display = $("#frequencyNumber");
    const message = $("#frequencyMessage");
    const waveform = $("#waveform");

    button.disabled = true;
    button.textContent = "SEARCHING...";

    waveform.classList.add("active");

    display.textContent = "--.--";
    message.textContent = "Searching the frequency spectrum...";

    setTimeout(() => {

        let index;

        do {
            index = Math.floor(
                Math.random() * transmissions.length
            );
        } while (
            index === lastFrequency &&
            transmissions.length > 1
        );

        lastFrequency = index;

        const signal = transmissions[index];

        display.textContent = signal.number;
        message.textContent = signal.message;

        waveform.classList.remove("active");

        button.disabled = false;
        button.textContent = "TUNE INTO ANOTHER SIGNAL ↗";

    }, 1500);

});


// ==========================================
// 7. INITIALIZATION
// ==========================================

console.log(
    "%c AFTERIMAGE ARCHIVE SYSTEM ",
    "background:#c47742;color:#11100e;padding:8px;font-weight:bold;"
);

console.log(
    "The archive is open. Keep your memories safe."
);

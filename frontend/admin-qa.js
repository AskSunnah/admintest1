// Array to store dynamic sections
let sections = [];

// Section type display names
const SECTION_LABELS = {
    quran: "From Quran",
    sunnah: "From Sunnah",
    scholars: "From Scholars",
    salaf: "From Salaf",
    normal: "Normal Text"
};

function renderSections() {
    const container = document.getElementById('dynamic-sections');
    container.innerHTML = "";
    sections.forEach((section, idx) => {
        const block = document.createElement('div');
        block.className = "section-block";
        // Section Header
        block.innerHTML = `
            <label>${SECTION_LABELS[section.type]}</label>
            <textarea class="section-text" data-idx="${idx}">${section.content}</textarea>
            <div class="section-btns">
                <button type="button" onclick="moveSection(${idx},-1)">↑</button>
                <button type="button" onclick="moveSection(${idx},1)">↓</button>
                <button type="button" onclick="deleteSection(${idx})">Delete</button>
            </div>
        `;
        container.appendChild(block);
    });
    // Listen for edits
    document.querySelectorAll('.section-text').forEach(area => {
        area.oninput = function() {
            sections[this.dataset.idx].content = this.value;
        };
    });
}

window.addSection = function() {
    const type = document.getElementById('section-type').value;
    sections.push({ type, content: "" });
    renderSections();
};

window.deleteSection = function(idx) {
    sections.splice(idx, 1);
    renderSections();
};

window.moveSection = function(idx, direction) {
    // direction: -1 for up, 1 for down
    if ((idx === 0 && direction === -1) || (idx === sections.length-1 && direction === 1)) return;
    [sections[idx], sections[idx+direction]] = [sections[idx+direction], sections[idx]];
    renderSections();
};

document.getElementById('add-section-btn').onclick = addSection;

// Handle Q&A save (for now, just show the JSON for testing)
document.getElementById('qa-form').onsubmit = function(e) {
    e.preventDefault();
    const qa = {
        title: document.getElementById('qa-title').value,
        question: document.getElementById('qa-question').value,
        answer: document.getElementById('qa-answer').value,
        sections,
        conclusion: document.getElementById('qa-conclusion').value
    };
    // You can send qa to backend here!
    document.getElementById('save-message').innerText = "Saved! (see console for data)";
    console.log("Q&A saved:", qa);
    // Reset form for demo
    document.getElementById('qa-form').reset();
    sections = [];
    renderSections();
};

renderSections();

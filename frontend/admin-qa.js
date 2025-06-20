/* admin-qa.js */
let sections = [];

function renderSections() {
    const container = document.getElementById('dynamic-sections');
    container.innerHTML = "";
    sections.forEach((section, idx) => {
        let html = `<div class="section-block"><h4>${section.type}</h4>`;

        if (section.type === "quran") {
            html += `
                <input type="text" placeholder="Reference" value="${section.reference || ''}" oninput="updateField(${idx}, 'reference', this.value)" required>
                <textarea placeholder="Verse Text" oninput="updateField(${idx}, 'text', this.value)" required>${section.text || ''}</textarea>
                <textarea placeholder="Commentary (optional)" oninput="updateField(${idx}, 'commentary', this.value)">${section.commentary || ''}</textarea>
            `;
        } else if (section.type === "sunnah") {
            html += `
                <input type="text" placeholder="Reference" value="${section.reference || ''}" oninput="updateField(${idx}, 'reference', this.value)" required>
                <input type="text" placeholder="Narrator (optional)" value="${section.narrator || ''}" oninput="updateField(${idx}, 'narrator', this.value)">
                <textarea placeholder="Hadith Text" oninput="updateField(${idx}, 'text', this.value)" required>${section.text || ''}</textarea>
                <textarea placeholder="Commentary (optional)" oninput="updateField(${idx}, 'commentary', this.value)">${section.commentary || ''}</textarea>
            `;
        } else if (section.type === "salaf" || section.type === "scholar") {
            html += `
                <textarea placeholder="Text" oninput="updateField(${idx}, 'text', this.value)" required>${section.text || ''}</textarea>
                <input type="text" placeholder="Reference (optional)" value="${section.reference || ''}" oninput="updateField(${idx}, 'reference', this.value)">
            `;
        } else if (section.type === "normal") {
            html += `
                <textarea placeholder="Text" oninput="updateField(${idx}, 'text', this.value)">${section.text || ''}</textarea>
            `;
        }

        html += `
            <div class="section-btns">
                <button type="button" onclick="moveSection(${idx}, -1)">↑</button>
                <button type="button" onclick="moveSection(${idx}, 1)">↓</button>
                <button type="button" onclick="deleteSection(${idx})">Delete</button>
            </div>
        </div>`;
        container.innerHTML += html;
    });
}

function updateField(index, key, value) {
    sections[index][key] = value;
}

document.getElementById('add-section-btn').onclick = () => {
    const type = document.getElementById('section-type').value;
    const newSection = { type };

    // Required initial structure
    if (type === "quran" || type === "sunnah") {
        newSection.reference = "";
        newSection.text = "";
        newSection.commentary = "";
        if (type === "sunnah") newSection.narrator = "";
    } else if (type === "salaf" || type === "scholar") {
        newSection.text = "";
        newSection.reference = "";
    } else if (type === "normal") {
        newSection.text = "";
    }

    sections.push(newSection);
    renderSections();
};

function deleteSection(idx) {
    sections.splice(idx, 1);
    renderSections();
}

function moveSection(idx, direction) {
    if ((idx === 0 && direction === -1) || (idx === sections.length - 1 && direction === 1)) return;
    [sections[idx], sections[idx + direction]] = [sections[idx + direction], sections[idx]];
    renderSections();
}

document.getElementById('qa-form').onsubmit = function (e) {
    e.preventDefault();
    const payload = {
        title: document.getElementById('qa-title').value,
        slug: document.getElementById('qa-slug').value,
        question: document.getElementById('qa-question').value,
        answer: document.getElementById('qa-answer').value,
        conclusion: document.getElementById('qa-conclusion').value,
        content: sections
    };

    console.log("Submitting this Q&A:", JSON.stringify(payload, null, 2));
    document.getElementById('save-message').innerText = "Saved! (see console for data)";
    this.reset();
    sections = [];
    renderSections();
};

renderSections();

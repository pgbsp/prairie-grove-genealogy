// =========================================
// PRAIRIE GROVE BORDEN FAMILY ACTIVITY
// =========================================

// Evidence descriptions are intentionally brief.
// Visitors must examine the attached document images
// to find the information needed for the family activity.

const people = [
  {
    id: "caledonia",
    name: "Caledonia Borden Brandenburg",
    zone: "children"
  },
  {
    id: "paschal",
    name: "Paschal P. Borden",
    zone: "unrelated"
  },
  {
    id: "mary-jane",
    name: "Mary Jane West",
    zone: "spouses"
  },
  {
    id: "thomas",
    name: "Thomas C. Borden",
    zone: "children"
  },
  {
    id: "sarah",
    name: "Sarah C. Rogers",
    zone: "spouses"
  },
  {
    id: "john-w",
    name: "John W. Borden",
    zone: "children"
  },
  {
    id: "archibald",
    name: "Archibald Borden",
    zone: "central"
  },
  {
    id: "julia",
    name: "Julia Borden",
    zone: "children"
  },
  {
    id: "mary-e",
    name: "Mary E. Maguerter",
    zone: "spouses"
  },
  {
    id: "william-l",
    name: "William L. Borden",
    zone: "children"
  },
  {
    id: "lavena",
    name: "Lavena Borden",
    zone: "children"
  },
  {
    id: "reynolds",
    name: "Reynolds Bascom Borden",
    zone: "children"
  }
];


// =========================================
// EVIDENCE COLLECTION
// =========================================

// Image paths assume an "images" folder in the same
// folder as index.html, styles.css, and script.js.
//
// Replace the example filenames below with the exact
// filenames of the document images you add.

const evidence = [
  {
    id: "family-record",
    title: "Archibald Borden: Family Record",
    summary: "A record containing information about Archibald Borden and his immediate family.",
    image: "images/archibald-family-record.jpg",
    caption: "Family information attributed to the 1911 Arkansas Confederate Census.",
    source: "Luginbuel Funeral Home, “Archibald Borden.” The online entry includes information attributed to the 1911 Arkansas Confederate Census. It is a secondary compilation, not the original census image."
  },

  {
    id: "caledonia-account",
    title: "A Daughter's Recollection",
    summary: "A personal account describing the days surrounding the Battle of Prairie Grove.",
    image: "images/caledonia-recollection.jpg",
    caption: "Recollections of Caldonia Ann Borden Brandenburg.",
    source: "National Park Service, “(H)our History Lesson: Civil War at Our Doorstep, Remembering Prairie Grove,” Document 2. The account was compiled by Eve Brandenburg Acuff in 1982 from earlier notes and conversations."
  },

  {
    id: "nancy-morton",
    title: "Families in the Cellar",
    summary: "A civilian recollection listing people who sought shelter during the battle.",
    image: "images/nancy-morton-account.jpg",
    caption: "Account of Nancy Morton Staples.",
    source: "National Park Service, Teaching with Historic Places, civilian recollections of the Battle of Prairie Grove."
  },

  {
    id: "paschal-borden",
    title: "Another Borden Family",
    summary: "A historical biography documenting a different Borden family line.",
    image: "images/paschal-borden-record.jpg",
    caption: "Biographical record for Paschal Pavolo Borden.",
    source: "Texas State Historical Association, “Borden, Paschal Pavolo.”"
  },

  {
    id: "archibald-obituary",
    title: "The Obituary of Archibald Borden",
    summary: "A newspaper obituary published shortly after Archibald Borden's death.",
    image: "images/archibald-obituary.jpg",
    caption: "Prairie Grove Herald obituary, August 6, 1914.",
    source: "Prairie Grove Herald, August 6, 1914, reproduced by Luginbuel Funeral Home in its Archibald Borden entry."
  }
];


// =========================================
// EVIDENCE DISPLAY
// =========================================

function renderEvidence() {
  const list = document.getElementById("evidence-list");

  evidence.forEach(item => {
    const details = document.createElement("details");
    details.className = "evidence-item";

    const summary = document.createElement("summary");
    summary.className = "evidence-toggle";

    summary.innerHTML = `
      <span>
        <span class="evidence-heading">${item.title}</span>
        <span class="evidence-summary">${item.summary}</span>
      </span>
      <span class="evidence-toggle-icon" aria-hidden="true">+</span>
    `;

    const content = document.createElement("div");
    content.className = "evidence-content";

    const caption = document.createElement("p");
    caption.className = "document-caption";
    caption.textContent = item.caption;

    const frame = document.createElement("div");
    frame.className = "document-frame";

    const image = document.createElement("img");
    image.className = "document-image";
    image.src = item.image;
    image.alt = item.caption;
    image.loading = "lazy";

    // If an image has not been added yet, show a helpful
    // placeholder instead of a broken image icon.
    image.addEventListener("error", () => {
      image.remove();

      const placeholder = document.createElement("div");
      placeholder.className = "image-placeholder";

      const heading = document.createElement("strong");
      heading.textContent = "Document image will appear here";

      const message = document.createElement("p");
      message.textContent =
        `Add your image to the images folder using this filename: ${item.image.split("/").pop()}`;

      placeholder.appendChild(heading);
      placeholder.appendChild(message);
      frame.appendChild(placeholder);
    });

    const source = document.createElement("p");
    source.className = "document-source";

    const sourceLabel = document.createElement("strong");
    sourceLabel.textContent = "Source: ";

    source.appendChild(sourceLabel);
    source.appendChild(document.createTextNode(item.source));

    frame.appendChild(image);
    content.appendChild(caption);
    content.appendChild(frame);
    content.appendChild(source);

    details.appendChild(summary);
    details.appendChild(content);

    list.appendChild(details);
  });
}


// =========================================
// FAMILY ACTIVITY
// =========================================

const bank = document.getElementById("people-bank");
const feedback = document.getElementById("activity-feedback");
const remainingCount = document.getElementById("remaining-count");

let selectedId = null;


function personCard(person, placed = false) {
  const card = document.createElement("button");

  card.type = "button";
  card.className = `person-card${placed ? " placed" : ""}`;
  card.draggable = true;
  card.dataset.personId = person.id;

  card.setAttribute(
    "aria-label",
    `${person.name}. ${placed
      ? "Select to return to people to place."
      : "Select to place."}`
  );

  const name = document.createElement("span");
  name.className = "person-name";
  name.textContent = person.name;

  card.appendChild(name);

  card.addEventListener("click", () => {
    if (placed) {
      returnToBank(person.id);
      return;
    }

    selectPerson(person.id);
  });

  card.addEventListener("dragstart", event => {
    event.dataTransfer.setData("text/plain", person.id);
    event.dataTransfer.effectAllowed = "move";

    selectedId = person.id;
    document.querySelectorAll(".people-bank .person-card").forEach(item => {
      item.classList.toggle("selected", item.dataset.personId === selectedId);
    });
  });

  card.addEventListener("dragend", () => {
    card.classList.toggle("selected", selectedId === person.id);
  });

  return card;
}


function renderBank() {
  bank.innerHTML = "";

  const placedIds = new Set(
    [...document.querySelectorAll(".drop-area .person-card")]
      .map(card => card.dataset.personId)
  );

  people
    .filter(person => !placedIds.has(person.id))
    .forEach(person => {
      const card = personCard(person);

      if (person.id === selectedId) {
        card.classList.add("selected");
      }

      bank.appendChild(card);
    });

  remainingCount.textContent =
    `${people.length - placedIds.size} remaining`;
}


function updateEmptyHints() {
  document.querySelectorAll(".drop-area").forEach(area => {
    const hint = area.querySelector(".empty-hint");

    if (hint) {
      hint.hidden =
        area.querySelectorAll(".person-card").length > 0;
    }
  });
}


function selectPerson(id) {
  selectedId = selectedId === id ? null : id;

  document.querySelectorAll(
    ".people-bank .person-card"
  ).forEach(card => {
    card.classList.toggle(
      "selected",
      card.dataset.personId === selectedId
    );
  });

  feedback.className = "activity-feedback";

  feedback.textContent = selectedId
    ? `Selected ${people.find(person => person.id === selectedId).name}. Now choose a placement area.`
    : "Selection cleared.";
}


function placePerson(id, zone) {
  const person = people.find(item => item.id === id);

  if (!person) return;

  const target = document.querySelector(
    `.drop-area[data-zone="${zone}"]`
  );

  if (!target) return;

  // Only one person can occupy the central figure area.
  if (zone === "central") {
    const existing = target.querySelector(".person-card");

    if (existing) {
      returnToBank(existing.dataset.personId);
    }
  }

  // Remove the card from its previous placement, if any.
  const previous = document.querySelector(
    `.drop-area .person-card[data-person-id="${id}"]`
  );

  if (previous) {
    previous.remove();
  }

  target.appendChild(personCard(person, true));

  selectedId = null;

  updateEmptyHints();
  renderBank();

  feedback.className = "activity-feedback";
  feedback.textContent =
    `${person.name} placed. Continue with the other names.`;
}


function returnToBank(id) {
  const card = document.querySelector(
    `.drop-area .person-card[data-person-id="${id}"]`
  );

  if (card) {
    card.remove();
  }

  selectedId = null;

  updateEmptyHints();
  renderBank();

  feedback.className = "activity-feedback";
  feedback.textContent =
    "The name has been returned to the people list.";
}


function setupDropZones() {
  document.querySelectorAll(".drop-area").forEach(area => {

    area.addEventListener("click", () => {
      if (selectedId) {
        placePerson(selectedId, area.dataset.zone);
      }
    });

    area.addEventListener("keydown", event => {
      if (event.target !== area || (event.key !== "Enter" && event.key !== " ")) {
        return;
      }

      event.preventDefault();

      if (selectedId) {
        placePerson(selectedId, area.dataset.zone);
      }
    });

    area.addEventListener("dragover", event => {
      event.preventDefault();
      area.classList.add("drag-over");
    });

    area.addEventListener("dragleave", () => {
      area.classList.remove("drag-over");
    });

    area.addEventListener("drop", event => {
      event.preventDefault();

      area.classList.remove("drag-over");

      const id = event.dataTransfer.getData("text/plain");

      if (id) {
        placePerson(id, area.dataset.zone);
      }
    });
  });
}


// =========================================
// CHECK ANSWERS
// =========================================

function checkAnswers() {
  let correct = 0;
  const total = people.length;

  people.forEach(person => {
    const card = document.querySelector(
      `.drop-area .person-card[data-person-id="${person.id}"]`
    );

    if (
      card &&
      card.closest(".drop-area").dataset.zone === person.zone
    ) {
      correct++;
    }
  });

  if (correct === total) {
    feedback.className = "activity-feedback success";

    feedback.textContent =
      "Well done. You have placed all the people according to the relationships supported by the evidence.";
  } else {
    feedback.className = "activity-feedback try-again";

    feedback.textContent =
      `${correct} of ${total} names are correctly placed. Revisit the evidence and try again. Remember: a shared surname does not establish a family relationship.`;
  }
}


// =========================================
// RESET ACTIVITY
// =========================================

function resetActivity() {
  document.querySelectorAll(
    ".drop-area .person-card"
  ).forEach(card => {
    card.remove();
  });

  selectedId = null;

  updateEmptyHints();
  renderBank();

  feedback.className = "activity-feedback";

  feedback.textContent =
    "The activity has been reset. Examine the evidence and begin placing the names.";
}


// =========================================
// NAVIGATION
// =========================================

function setupNavigation() {
  const links = [
    ...document.querySelectorAll(".nav-link")
  ];

  const sections = [
    ...document.querySelectorAll(".page-section")
  ];

  links.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      const targetId = link.dataset.section;

      sections.forEach(section => {
        section.hidden = section.id !== targetId;
      });

      links.forEach(item => {
        item.classList.toggle("active", item === link);
      });

      history.replaceState(null, "", `#${targetId}`);

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });

  // Open the correct section if the page loads with a URL hash.
  const initial = window.location.hash.replace("#", "");

  const initialLink = links.find(
    link => link.dataset.section === initial
  );

  if (initialLink) {
    initialLink.click();
  }
}


// =========================================
// INITIALIZE
// =========================================

renderEvidence();
renderBank();
setupDropZones();
updateEmptyHints();
setupNavigation();

document
  .getElementById("check-button")
  .addEventListener("click", checkAnswers);

document
  .getElementById("reset-button")
  .addEventListener("click", resetActivity);
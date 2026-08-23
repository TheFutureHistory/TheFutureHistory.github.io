// Feather icons
feather.replace();

// DOM Elements
const experienceContainer = document.getElementById("experienceContainer");
const educationContainer = document.getElementById("educationContainer");
const skillsContainer = document.getElementById("skillsContainer");
const skillInput = document.getElementById("skillInput");
const addSkillBtn = document.getElementById("addSkill");
const languagesContainer = document.getElementById("languagesContainer");
const languageInput = document.getElementById("languageInput");
const addLanguageBtn = document.getElementById("addLanguage");
const addExperienceBtn = document.getElementById("addExperience");
const addEducationBtn = document.getElementById("addEducation");
const downloadBtn = document.getElementById("downloadBtn");
const resumePreview = document.getElementById("resumePreview");

// Form inputs
const formInputs = {
  fullName: document.getElementById("fullName"),
  website: document.getElementById("website"),
  email: document.getElementById("email"),
  phone: document.getElementById("phone"),
  address: document.getElementById("address"),
  summary: document.getElementById("summary"),
};

// Storage Functions
function saveToStorage() {
  const data = {
    personal: {
      fullName: formInputs.fullName.value,
      website: formInputs.website.value,
      email: formInputs.email.value,
      phone: formInputs.phone.value,
      address: formInputs.address.value,
      summary: formInputs.summary.value,
    },
    skills: Array.from(skillsContainer.querySelectorAll(".skill-tag")).map(
      (tag) => tag.textContent.trim().replace("×", "").trim()
    ),
    languages: Array.from(languagesContainer.querySelectorAll(".language-tag")).map(
      (tag) => tag.textContent.trim().replace("×", "").trim()
    ),
    experiences: Array.from(experienceContainer.querySelectorAll(".experience-item")).map(
      (item) => ({
        company: item.querySelector(".experience-company").value,
        title: item.querySelector(".experience-title").value,
        start: item.querySelector(".experience-start").value,
        end: item.querySelector(".experience-end").value,
        description: item.querySelector(".experience-description").value,
      })
    ),
    education: Array.from(educationContainer.querySelectorAll(".education-item")).map(
      (item) => ({
        institution: item.querySelector(".education-institution").value,
        degree: item.querySelector(".education-degree").value,
        start: item.querySelector(".education-start").value,
        end: item.querySelector(".education-end").value,
      })
    ),
  };
  
  try {
    localStorage.setItem("resumeData", JSON.stringify(data));
  } catch (e) {
    console.log("Storage not available");
  }
}

function loadFromStorage() {
  try {
    const saved = localStorage.getItem("resumeData");
    if (!saved) return;
    
    const data = JSON.parse(saved);
    
    // Load personal info
    if (data.personal) {
      formInputs.fullName.value = data.personal.fullName || "";
      formInputs.website.value = data.personal.website || "";
      formInputs.email.value = data.personal.email || "";
      formInputs.phone.value = data.personal.phone || "";
      formInputs.address.value = data.personal.address || "";
      formInputs.summary.value = data.personal.summary || "";
    }
    
    // Clear existing entries
    experienceContainer.innerHTML = "";
    educationContainer.innerHTML = "";
    skillsContainer.innerHTML = "";
    languagesContainer.innerHTML = "";
    
    // Load experiences
    if (data.experiences && data.experiences.length > 0) {
      data.experiences.forEach((exp) => {
        addExperienceField();
        const lastExp = experienceContainer.lastElementChild;
        lastExp.querySelector(".experience-company").value = exp.company || "";
        lastExp.querySelector(".experience-title").value = exp.title || "";
        lastExp.querySelector(".experience-start").value = exp.start || "";
        lastExp.querySelector(".experience-end").value = exp.end || "";
        lastExp.querySelector(".experience-description").value = exp.description || "";
      });
    } else {
      addExperienceField();
    }
    
    // Load education
    if (data.education && data.education.length > 0) {
      data.education.forEach((edu) => {
        addEducationField();
        const lastEdu = educationContainer.lastElementChild;
        lastEdu.querySelector(".education-institution").value = edu.institution || "";
        lastEdu.querySelector(".education-degree").value = edu.degree || "";
        lastEdu.querySelector(".education-start").value = edu.start || "";
        lastEdu.querySelector(".education-end").value = edu.end || "";
      });
    } else {
      addEducationField();
    }
    
    // Load skills
    if (data.skills && data.skills.length > 0) {
      data.skills.forEach((skill) => {
        if (skill && !document.getElementById(`skill-${skill}`)) {
          const skillTag = document.createElement("div");
          skillTag.className =
            "skill-tag flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full";
          skillTag.id = `skill-${skill}`;
          
          skillTag.innerHTML = `
            ${skill}
            <button onclick="removeSkill('${skill}')" class="ml-2 text-indigo-500 hover:text-indigo-700">
              <i data-feather="x" class="w-4 h-4"></i>
            </button>
          `;
          
          skillsContainer.appendChild(skillTag);
        }
      });
      feather.replace(
        {  container: skillsContainer }
      );
    }

    // Load languages
    if (data.languages && data.languages.length > 0) {
      data.languages.forEach((language) => {
        if (language && !document.getElementById(`language-${language}`)) {
          const languageTag = document.createElement("div");
          languageTag.className =
            "language-tag flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full";
          languageTag.id = `language-${language}`;
          
          languageTag.innerHTML = `
            ${language}
            <button onclick="removeLanguage('${language}')" class="ml-2 text-indigo-500 hover:text-indigo-700">
              <i data-feather="x" class="w-4 h-4"></i>
            </button>
          `;
          
          languagesContainer.appendChild(languageTag);
        }
      });
      feather.replace(
        {container: languagesContainer }
      );
    }
    
    updatePreview();
  } catch (e) {
    console.log("Could not load saved data");
    addExperienceField();
    addEducationField();
  }
}

// Event listeners
Object.values(formInputs).forEach((input) => {
  input.addEventListener("input", () => {
    updatePreview();
    saveToStorage();
  });
});

// Load saved data on startup
loadFromStorage();

addSkillBtn.addEventListener("click", addSkill);
skillInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addSkill();
});

addLanguageBtn.addEventListener("click", addLanguage);
languageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addLanguage();
});

addExperienceBtn.addEventListener("click", addExperienceField);
addEducationBtn.addEventListener("click", addEducationField);
downloadBtn.addEventListener("click", generatePDF);

// Functions
function addSkill() {
  const skill = skillInput.value.trim();
  if (skill && !document.getElementById(`skill-${skill}`)) {
    const skillTag = document.createElement("div");
    skillTag.className =
      "skill-tag flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full";
    skillTag.id = `skill-${skill}`;

    skillTag.innerHTML = `
      ${skill}
      <button onclick="removeSkill('${skill}')" class="ml-2 text-indigo-500 hover:text-indigo-700">
        <i data-feather="x" class="w-4 h-4"></i>
      </button>
    `;

    skillsContainer.appendChild(skillTag);
    skillInput.value = "";
    feather.replace({container: skillsContainer });
    updatePreview();
    saveToStorage();
  }
}

function removeSkill(skill) {
  const skillTag = document.getElementById(`skill-${skill}`);
  if (skillTag) {
    skillsContainer.removeChild(skillTag);
    updatePreview();
    saveToStorage();
  }
}

function addLanguage() {
  const language = languageInput.value.trim();
  if (language && !document.getElementById(`language-${language}`)) {
    const languageTag = document.createElement("div");
    languageTag.className =
      "language-tag flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full";
    languageTag.id = `language-${language}`;

    languageTag.innerHTML = `
      ${language}
      <button onclick="removeLanguage('${language}')" class="ml-2 text-indigo-500 hover:text-indigo-700">
        <i data-feather="x" class="w-4 h-4"></i>
      </button>
    `;

    languagesContainer.appendChild(languageTag);
    languageInput.value = "";
    feather.replace();
    updatePreview();
    saveToStorage();
  }
}

function removeLanguage(language) {
  const languageTag = document.getElementById(`language-${language}`);
  if (languageTag) {
    languagesContainer.removeChild(languageTag);
    updatePreview();
    saveToStorage();
  }
}

function addExperienceField() {
  const experienceField = document.createElement("div");
  experienceField.className = "experience-item mb-6 p-4 border rounded-lg bg-gray-50";

  experienceField.innerHTML = `
    <div class="flex justify-between items-center mb-2">
      <h3 class="font-medium">Experience</h3>
      <button onclick="removeField(this, 'experience')" class="text-red-500 hover:text-red-700">
        <i data-feather="trash-2" class="w-4 h-4"></i>
      </button>
    </div>
    <div class="experienceInput"> 
        <input type="text" class="input-field experience-company" placeholder="Company" />
        <input type="text" class="input-field experience-title" placeholder="Job Title" />
    </div>
    <div class="experienceInput"> 
      <input type="text" class="input-field experience-start" placeholder="Start Date" />
      <input type="text" class="input-field experience-end" placeholder="End Date" />
    </div>
    <textarea class="input-field experience-description" rows="3" placeholder="Describe your role..."></textarea>
  `;

  experienceContainer.appendChild(experienceField);
  feather.replace({container: experienceContainer});
  experienceField.querySelectorAll("input, textarea").forEach((el) => {
    el.addEventListener("input", () => {
      updatePreview();
      saveToStorage();
    });
  });
}

function addEducationField() {
  const educationField = document.createElement("div");
  educationField.className = "education-item mb-6 p-4 border rounded-lg bg-gray-50";

  educationField.innerHTML = `
    <div class="flex justify-between items-center mb-2">
      <h3 class="font-medium">Education</h3>
      <button onclick="removeField(this, 'education')" class="text-red-500 hover:text-red-700">
        <i data-feather="trash-2" class="w-4 h-4"></i>
      </button>
    </div>
    <div class="educationInput"> 
      <input type="text" class="input-field education-institution" placeholder="Institution" />
      <input type="text" class="input-field education-degree" placeholder="Degree" />
    </div>
    <div class="educationInput">
      <input type="text" class="input-field education-start" placeholder="Start Date" />
      <input type="text" class="input-field education-end" placeholder="End Date" />
    </div>

  `;

  educationContainer.appendChild(educationField);
  feather.replace({container: educationContainer });
  educationField.querySelectorAll("input").forEach((el) => {
    el.addEventListener("input", () => {
      updatePreview();
      saveToStorage();
    });
  });
}

function removeField(button, type) {
  const field = button.closest(`.${type}-item`);
  if (field) {
    field.remove();
    updatePreview();
    saveToStorage();
  }
}

function updatePreview() {
  const name = formInputs.fullName.value || "Your Name";
  const website = formInputs.website.value || "";
  const email = formInputs.email.value || "your.email@example.com";
  const phone = formInputs.phone.value || "";
  const address = formInputs.address.value || "City, Country";
  const summary =
    formInputs.summary.value ||
    "";

  const skillTags = Array.from(skillsContainer.querySelectorAll(".skill-tag")).map(
    (tag) => tag.textContent.trim().replace("×", "").trim()
  );

  const languageTags = Array.from(languagesContainer.querySelectorAll(".language-tag")).map(
    (tag) => tag.textContent.trim().replace("×", "").trim()
  );

  const experiences = Array.from(experienceContainer.querySelectorAll(".experience-item")).map(
    (item) => ({
      company: item.querySelector(".experience-company").value || "Company",
      title: item.querySelector(".experience-title").value || "Job Title",
      start: item.querySelector(".experience-start").value || "Start Date",
      end: item.querySelector(".experience-end").value || "End Date",
      description: item.querySelector(".experience-description").value || "Job description...",
    })
  );

  const education = Array.from(educationContainer.querySelectorAll(".education-item")).map(
    (item) => ({
      institution: item.querySelector(".education-institution").value || "Institution",
      degree: item.querySelector(".education-degree").value || "Degree",
      start: item.querySelector(".education-start").value || "Start Date",
      end: item.querySelector(".education-end").value || "End Date",
    })
  );

  let personalInfoHTML = "";
  if (name || website || email || phone || address) {
    personalInfoHTML += `<div>`;
    if (name) {
      personalInfoHTML += `<h1 class="text-3xl font-bold mb-1">${name}</h1>`;
    }
    let contactHTML = "";
    if (website) contactHTML += `<span>${website}</span>`;
    if (email) contactHTML += `<span>${email}</span>`;
    if (phone) contactHTML += `<span>${phone}</span>`;
    if (address) contactHTML += `<span>${address}</span>`;
    if (contactHTML) {
      personalInfoHTML += `<div class="flex flex-col gap-x-1 text-gray-600">${contactHTML}</div>`;
    }
    personalInfoHTML += `</div>`;
  }

  let previewHTML = personalInfoHTML;

  if (summary.trim()) {
  previewHTML += `
    <div class="mt-4">
      <h2 class="text-l font-bold mb-2 text-gray-800">Summary</h2>
      <p class="text-sm">${summary}</p>
    </div>
  `;
  }

  if (languageTags.length > 0) {
  previewHTML += `
      <div class="mt-4">
      <h2 class="text-l font-bold mb-2 text-gray-800">Languages</h2>
      <div class="flex flex-wrap gap-0.5">
          ${languageTags.map((s) => `<span class="rounded-full">${s}</span>`).join(", ")}
      </div>
      </div>
  `;
  }

  if (experiences.length > 0) {
    previewHTML += `
      <div class="mt-4">
        <h2 class="text-l font-bold mb-2 text-gray-800">Work Experience</h2>
        ${experiences
          .map(
            (exp) => `
          <div class="mb-2">
            <div class="flex justify-between">
              <div class="flex flex-start">
                <h3 class="mr-1">${exp.company} -</h3>
                <p class="text-l">${exp.title}</p>
              </div>
              <span>${exp.start} - ${exp.end}</span>
            </div>
            <p class="text-sm mb-5">${exp.description}</p>
          </div>`
          )
          .join("")}
      </div>
    `;
  }

  if (education.length > 0) {
    previewHTML += `
      <div class="mt-4">
        <h2 class="text-l font-bold mb-2 text-gray-800">Education</h2>
        ${education
          .map(
            (edu) => `
          <div class="mb-2">
            <div class="flex justify-between"> 
              <div class="flex flex-start">
                <h3 class="mr-1">${edu.institution} -</h3>
                <p class="text-l">${edu.degree}</p>
              </div>
              <span>${edu.start} - ${edu.end}</span>
            </div>
          </div>`
          )
          .join("")}
      </div>
    `;
  }

    if (skillTags.length > 0) {
    previewHTML += `
        <div class="mt-4">
        <h2 class="text-l font-bold mb-2 text-gray-800">Skills</h2>
        <div class="flex flex-wrap gap-0.5">
            ${skillTags.map((s) => `<span class="mr-0.25 rounded-full">${s}</span>`).join(", ")}
        </div>
        </div>
    `;
    }

  resumePreview.innerHTML = previewHTML;
  addPageBreakIndicators()

}

function addPageBreakIndicators() {
  const preview = resumePreview;
  // Remove old indicators
  Array.from(preview.querySelectorAll('.page-break-indicator')).forEach(el => el.remove());

  // A4 page height in pixels at 96dpi (approximate for web preview)
  const a4HeightPx = 1020; // 297mm * (96/25.4)
  let totalHeight = preview.scrollHeight;
  let pageCount = Math.floor(totalHeight / a4HeightPx);

  for (let i = 1; i <= pageCount; i++) {
    const breakLine = document.createElement('div');
    breakLine.className = 'page-break-indicator';
    breakLine.style.position = 'absolute';
    breakLine.style.left = '0';
    breakLine.style.right = '0';
    breakLine.style.top = `${i * a4HeightPx}px`;
    breakLine.style.height = '0';
    breakLine.style.borderTop = '2px dashed #e53e3e';
    breakLine.style.zIndex = '100';
    breakLine.style.pointerEvents = 'none';
    preview.appendChild(breakLine);
    preview.style.position = 'relative';
  }
}

// ...existing code...

async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4');

  const marginLeft = 20;
  const marginRight = 20;
  const marginTop = 20;
  const marginBottom = 20;
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const contentWidth = pageWidth - marginLeft - marginRight;
  let y = marginTop;

  // Gather resume data (no default values)
  const name = formInputs.fullName.value.trim();
  const website = formInputs.website.value.trim();
  const email = formInputs.email.value.trim();
  const phone = formInputs.phone.value.trim();
  const address = formInputs.address.value.trim();
  const summary = formInputs.summary.value.trim();

  const skillTags = Array.from(skillsContainer.querySelectorAll(".skill-tag")).map(
    (tag) => tag.textContent.trim().replace("×", "").trim()
  );
  const languageTags = Array.from(languagesContainer.querySelectorAll(".language-tag")).map(
    (tag) => tag.textContent.trim().replace("×", "").trim()
  );
  const experiences = Array.from(experienceContainer.querySelectorAll(".experience-item")).map(
    (item) => ({
      company: item.querySelector(".experience-company").value.trim(),
      title: item.querySelector(".experience-title").value.trim(),
      start: item.querySelector(".experience-start").value.trim(),
      end: item.querySelector(".experience-end").value.trim(),
      description: item.querySelector(".experience-description").value.trim(),
    })
  );
  const education = Array.from(educationContainer.querySelectorAll(".education-item")).map(
    (item) => ({
      institution: item.querySelector(".education-institution").value.trim(),
      degree: item.querySelector(".education-degree").value.trim(),
      start: item.querySelector(".education-start").value.trim(),
      end: item.querySelector(".education-end").value.trim(),
    })
  );

  function addTextBlock(text, fontSize = 12, bold = false, spacingAfter = 0, indent = 0) {
    pdf.setFontSize(fontSize);
    pdf.setFont(undefined, bold ? 'bold' : 'normal');
    const lines = pdf.splitTextToSize(text, contentWidth - indent);
    const filteredLines = lines.filter(line => line.trim() !== '');
    filteredLines.forEach(line => {
      if (y + fontSize * 0.5 > pageHeight - marginBottom) {
        pdf.addPage();
        y = marginTop;
      }
      pdf.text(line, marginLeft + indent, y);
      y += fontSize * 0.5;
    });
    y += spacingAfter;
    pdf.setFont(undefined, 'normal');
  }

  // Personal Info
  if (name) {
    addTextBlock(name, 22, true, 0);
    y -= 4;
  }
  if (website) addTextBlock(website, 11, false, 0.1);
  if (email) addTextBlock(email, 11, false, 0.1);
  if (phone) addTextBlock(phone, 11, false, 0.1);
  if (address) addTextBlock(address, 11, false, 5);

  // Summary
  if (summary) {
    addTextBlock("Summary", 14, true, 0.1);
    addTextBlock(summary, 11, false, 5);
  }

  // Languages
  if (languageTags.length > 0) {
    addTextBlock("Languages", 14, true, 0.1);
    addTextBlock(languageTags.join(", "), 11, false, 5);
  }

  // Work Experience
  const filteredExperiences = experiences.filter(exp =>
    exp.company || exp.title || exp.start || exp.end || exp.description
  );
  if (filteredExperiences.length > 0) {
    addTextBlock("Work Experience", 14, true, 0.1);
    filteredExperiences.forEach(exp => {
      let line = "";
      if (exp.company) line += exp.company;
      if (exp.title) line += (line ? " - " : "") + exp.title;
      if (exp.start || exp.end) line += (line ? ", " : "") + `${exp.start} - ${exp.end}`;
      if (line) addTextBlock(line, 12, true, 0.1);
      if (exp.description) addTextBlock(exp.description, 11, false, 5);
    });
  }

  // Education
  const filteredEducation = education.filter(edu =>
    edu.institution || edu.degree || edu.start || edu.end
  );
  if (filteredEducation.length > 0) {
    addTextBlock("Education", 14, true, 0.1);
    filteredEducation.forEach(edu => {
      let line = "";
      if (edu.institution) line += edu.institution;
      if (edu.degree) line += (line ? " - " : "") + edu.degree;
      if (edu.start || edu.end) line += (line ? ", " : "") + `${edu.start} - ${edu.end}`;
      if (line) addTextBlock(line, 12, true, 5);
    });
  }

  // Skills
  if (skillTags.length > 0) {
    addTextBlock("Skills", 14, true, 0.1);
    addTextBlock(skillTags.join(", "), 11, false, 5);
  }

  pdf.save('resume.pdf');
}

// ...existing code...



updatePreview();
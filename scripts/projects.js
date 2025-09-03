document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.querySelector(".projects-container");

  // Function to create a modal
  const createModal = () => {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "projectModal";
    
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title" id="modalTitle"></h2>
          <button class="close-btn" id="closeModal">&times;</button>
        </div>
        <div class="modal-body" id="modalBody">
          <!-- Content will be dynamically inserted here -->
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
  };

  // Function to show modal with project details
  const showModal = (project) => {
    const modal = document.getElementById("projectModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    
    modalTitle.textContent = project.title;
    
    modalBody.innerHTML = `
      <img src="${project.image}" alt="${project.title} Image">
      <p class="modal-description">${project.description}</p>
      <div class="modal-info">
        <p><strong>Class Completed:</strong> ${project['class completed']}</p>
      </div>
      <a href="${project.github || project.behance}" target="_blank" class="modal-link">View Project</a>
    `;
    
    modal.classList.add("show");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  // Function to hide modal
  const hideModal = () => {
    const modal = document.getElementById("projectModal");
    modal.classList.remove("show");
    document.body.style.overflow = "auto"; // Restore scrolling
  };

  // Function to create a project card
  const createProjectCard = (project) => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
      <div class="project-header">
        ${project.title}
      </div>
      <div class="project-preview">
        <img src="${project.image}" alt="${project.title} Thumbnail">
        <p>${project.description}</p>
        <button class="view-details-btn">View Details</button>
      </div>
    `;

    // Add click event to the entire card
    card.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showModal(project);
    });

    return card;
  };

  // Create modal once
  const modal = createModal();
  
  // Add event listeners for modal
  document.addEventListener("click", (e) => {
    if (e.target.id === "closeModal" || e.target.id === "projectModal") {
      hideModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideModal();
    }
  });

  // Fetch the JSON data
  fetch('./data/data.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      return response.json();
    })
    .then((projects) => {
      // Render project cards
      projects.forEach((project) => {
        const card = createProjectCard(project);
        projectsContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Failed to load JSON data:", error);
      projectsContainer.textContent = "Failed to load projects. Please try again later.";
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.querySelector(".projects-container");
  
    // Function to create a collapsible project card
    const createProjectCard = (project) => {
      const card = document.createElement("div");
      card.className = "project-card collapsed";
  
      const header = document.createElement("button");
      header.className = "project-header";
      header.textContent = project.title;
      header.addEventListener("click", () => {
        const isCollapsed = card.classList.toggle("collapsed");
        card.classList.toggle("expanded", !isCollapsed);
      });
  
      const details = document.createElement("div");
      details.className = "project-details";
      details.style.display = "none"; // Initially hidden
  
      const image = document.createElement("img");
      image.src = project.image;
      image.alt = `${project.title} Thumbnail`;
  
      const description = document.createElement("p");
      description.textContent = project.description;
  
      const moreInfo = document.createElement("div");
      moreInfo.innerHTML = `
        <p><strong>Class Completed:</strong> ${project['class completed']}</p>
        <p><a href="${project.github}" target="_blank" class="project-link">View on GitHub</a></p>
      `;
  
      details.appendChild(image);
      details.appendChild(description);
      details.appendChild(moreInfo);
  
      card.appendChild(header);
      card.appendChild(details);
  
      // Toggle details visibility on click
      header.addEventListener("click", () => {
        const isVisible = details.style.display === "block";
        details.style.display = isVisible ? "none" : "block";
      });
  
      return card;
    };
  
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
  

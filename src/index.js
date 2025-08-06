const loadProperties = () => {
  const propertiesContainer = document.getElementById('properties');

  // load properties from a local JSON file
  fetch('properties.json')
    .then((response) => response.json())
    .then((properties) => {
      const letAgreed = properties.filter((p) => p.letAgreed);
      const notLetAgreed = properties.filter((p) => !p.letAgreed);
      const propLists = [...notLetAgreed, ...letAgreed];

      propLists.forEach((property) => {
        const propertyElement = document.createElement('div');
        propertyElement.className = 'property';
        propertyElement.innerHTML = `
                    <a href="#" class=rounded-3xl>
                        <div class="relative">
                        <img class="rounded-3xl flex-1 object-cover mb-2" src="${
                          property.imageUrl
                        }" alt="${property.title}" class="property-image" />
                        ${
                          property.letAgreed
                            ? '<div class="absolute top-0 left-0 w-full h-full bg-white opacity-65"></div><p class="absolute right-2 top-2 text-white text-sm bg-blue-400 px-2 py-1 rounded-3xl">Let Agreed</p>'
                            : ''
                        }
                        </div>
                        <h2 class="truncate">${property.title}</h2>
                        <p class="text-neutral-400 text-sm truncate">${
                          property.description
                        }</p>
                        <p class="underline mt-2">£${property.rentPerMonth}</p>
                        <p class="text-neutral-400">per month</p>
                    </a>
                `;
        propertiesContainer.appendChild(propertyElement);
      });
    })
    .catch((error) => {
      console.error('Error loading properties:', error);
      propertiesContainer.innerHTML = '<p>Error loading properties.</p>';
    });
};

loadProperties();

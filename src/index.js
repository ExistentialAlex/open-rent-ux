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
                    <img class="rounded-3xl flex-1 object-cover mb-2" src="${property.imageUrl}" alt="${property.title}" class="property-image" />  
                    <h2 class="truncate">${property.title}</h2>
                    <p class="text-neutral-400 text-sm truncate">${property.description}</p>
                    <p class="underline mt-2">£${property.rentPerMonth}</p>
                    <p class="text-neutral-400">per month</p>
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

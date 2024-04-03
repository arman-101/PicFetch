chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { action: "getMainImages" }, function(response) {
    if (response && response.images) {
      displayImages(response.images);
      updateTitle(response.images.length); // Update title with number of images
    } else {
      displayNoImagesFound();
      updateTitle(0); // Update title when no images found
    }
  });
});

function updateTitle(imageCount) {
  const imageCountElement = document.getElementById("image-count");
  imageCountElement.textContent = ` - ${imageCount} Images Found`;
}
  
function displayImages(images) {
  const list = document.getElementById("images-list");
  list.innerHTML = "";

  images.forEach((image, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("image-item");

    const imageThumbnail = document.createElement("img");
    imageThumbnail.classList.add("image-thumbnail");
    imageThumbnail.src = image.src;
    imageThumbnail.onerror = function() {
      imageThumbnail.src = "icons/not-found-500.png"; // Load "not found" image if original image fails to load
    };

    const imageName = document.createElement("span");
    imageName.textContent = image.name || "Image Name";
    imageName.title = image.name; // Set title attribute to display full name on hover
    imageName.classList.add("image-name");

    const imageSize = document.createElement("span");
    imageSize.textContent = `${image.width}x${image.height}` || "Image Size";

    listItem.appendChild(imageThumbnail);
    listItem.appendChild(imageName);
    listItem.appendChild(imageSize);

    list.appendChild(listItem);
  });
}

function displayNoImagesFound() {
  const list = document.getElementById("images-list");
  list.innerHTML = "<li>No images found</li>";
}

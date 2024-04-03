chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getMainImages") {
      const images = Array.from(document.querySelectorAll("img"))
        .filter(img => img.width > 100 && img.height > 100) // Adjust criteria as needed
        .map((img, index) => ({
          src: img.src,
          name: img.alt || `Image ${index + 1}`,
          width: img.width,
          height: img.height,
          size: img.width * img.height // Calculate image size as width * height
        }));
  
      // Order images by size (largest first)
      images.sort((a, b) => b.size - a.size);
  
      sendResponse({ images });
    }
  });
  
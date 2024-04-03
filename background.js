chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "downloadImage") {
      // Extract file extension from the image URL
      const urlParts = request.imageUrl.split(".");
      const fileExtension = urlParts[urlParts.length - 1];
  
      // Construct filename with file extension
      const filename = `${request.imageName}.${fileExtension}`;
  
      // Initiate download with the correct filename
      chrome.downloads.download({ url: request.imageUrl, filename: filename });
    }
  });
  
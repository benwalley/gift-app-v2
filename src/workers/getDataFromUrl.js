
export default function initAmazonPostWorker() {
    this.addEventListener("fetch", (event) => {
        // Only use this event listener for POST requests sent to /share-file-handler.
        const url = new URL(event.request.url);
        if (
            event.request.method !== "POST" ||
            url.pathname !== "/create-wishlist-item-post"
        ) {
            return;
        }

        function sendFilesToFrontend(textFiles, htmlFiles, imageFiles) {
            postMessage({textFiles, htmlFiles, imageFiles})
        }

        event.respondWith(
            (async () => {
                // Get the data from the submitted form.
                const formData = await event.request.formData();

                // Get the submitted files.
                const textFiles = formData.getAll("textFiles");
                const htmlFiles = formData.getAll("htmlFiles");
                const imageFiles = formData.getAll("images");

                // Send the files to the frontend app.
                sendFilesToFrontend(textFiles, htmlFiles, imageFiles);

                // Redirect the user to a URL that shows the imported files.
                // return Response.redirect("/create-wishlist-item", 303);
            })(),
        );
    });
};




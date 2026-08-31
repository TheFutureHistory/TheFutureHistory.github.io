let posts = [];
let currentPostIndex = 0;

const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1920;

const postSelect = document.getElementById("postSelect");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const exportButton = document.getElementById("exportButton");

const backgroundImage = document.getElementById("backgroundImage");
const postTitle = document.getElementById("postTitle");
const postParagraph = document.getElementById("postParagraph");
const fallbackText = document.getElementById("fallbackText");
const instagramCanvas = document.getElementById("instagramCanvas");
const contentHeader = document.querySelector(".contentHeader");

const status = document.getElementById("status");

backgroundImage.addEventListener("error", () => {
  backgroundImage.classList.add("is-hidden");
  fallbackText.hidden = false;
});

// ----------------------------------------
// LOAD JSON
// ----------------------------------------

async function loadPosts() {
  try {
    const response = await fetch("content.json");

    if (!response.ok) {
      throw new Error("Could not load content.json");
    }

    posts = await response.json();

    if (!Array.isArray(posts) || posts.length === 0) {
      throw new Error("content.json does not contain any posts.");
    }

    createPostSelector();

    renderPost(0);
  } catch (error) {
    console.error(error);

    status.textContent = error.message;
  }
}

// ----------------------------------------
// CREATE POST SELECTOR
// ----------------------------------------

function createPostSelector() {
  postSelect.innerHTML = "";

  posts.forEach((post, index) => {
    const option = document.createElement("option");

    option.value = index;

    option.textContent = `Post ${index + 1}`;

    postSelect.appendChild(option);
  });
}

// ----------------------------------------
// RENDER POST
// ----------------------------------------

function renderPost(index) {
  if (!posts[index]) {
    return;
  }

  currentPostIndex = index;

  const post = posts[index];

  postTitle.textContent = post.title || "";

  postParagraph.textContent = post.paragraph || "";

  backgroundImage.src = post.backgroundImage || "";
  backgroundImage.classList.toggle("is-hidden", !post.backgroundImage);
  fallbackText.hidden = Boolean(post.backgroundImage);

  postSelect.value = index;

  status.textContent = `Post ${index + 1} of ${posts.length}`;
}

// ----------------------------------------
// PREVIOUS
// ----------------------------------------

previousButton.addEventListener("click", () => {
  let newIndex = currentPostIndex - 1;

  if (newIndex < 0) {
    newIndex = posts.length - 1;
  }

  renderPost(newIndex);
});

// ----------------------------------------
// NEXT
// ----------------------------------------

nextButton.addEventListener("click", () => {
  let newIndex = currentPostIndex + 1;

  if (newIndex >= posts.length) {
    newIndex = 0;
  }

  renderPost(newIndex);
});

// ----------------------------------------
// SELECT POST
// ----------------------------------------

postSelect.addEventListener("change", (event) => {
  const index = Number(event.target.value);

  renderPost(index);
});

// ----------------------------------------
// EXPORT PNG
// ----------------------------------------

exportButton.addEventListener("click", async () => {
  status.textContent = "Preparing PNG...";

  try {
    const post = posts[currentPostIndex];

    const image = post.backgroundImage
      ? await loadImage(post.backgroundImage).catch(() => null)
      : null;

    const outputCanvas = document.createElement("canvas");

    outputCanvas.width = CANVAS_WIDTH;
    outputCanvas.height = CANVAS_HEIGHT;

    const ctx = outputCanvas.getContext("2d");

    // --------------------------------
    // BACKGROUND
    // --------------------------------

    if (image) {
      drawCoverImage(ctx, image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    } else {
      const fallback = ctx.createLinearGradient(
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT,
      );
      fallback.addColorStop(0, "#173b45");
      fallback.addColorStop(1, "#d46b45");
      ctx.fillStyle = fallback;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }

    // --------------------------------
    // OVERLAY
    // --------------------------------

    const overlayStart = CANVAS_HEIGHT * 0.3;
    const gradient = ctx.createLinearGradient(
      0,
      overlayStart,
      0,
      CANVAS_HEIGHT,
    );

    gradient.addColorStop(0, "rgba(0,0,0,0)");

    gradient.addColorStop(1, "rgba(0,0,0,0.92)");

    ctx.fillStyle = gradient;

    ctx.fillRect(0, overlayStart, CANVAS_WIDTH, CANVAS_HEIGHT - overlayStart);

    // --------------------------------
    // TEXT: mirror the live preview's measured layout.
    // --------------------------------

    const previewScale = CANVAS_HEIGHT / instagramCanvas.clientHeight;
    const canvasRect = instagramCanvas.getBoundingClientRect();

    drawPreviewText(ctx, contentHeader, canvasRect, previewScale);
    drawPreviewText(ctx, postTitle, canvasRect, previewScale);
    drawPreviewText(ctx, postParagraph, canvasRect, previewScale);

    // --------------------------------
    // DOWNLOAD
    // --------------------------------

    outputCanvas.toBlob((blob) => {
      if (!blob) {
        throw new Error("Could not create PNG.");
      }

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `story-${currentPostIndex + 1}.png`;

      link.click();

      URL.revokeObjectURL(url);

      status.textContent = "PNG exported successfully.";
    }, "image/png");
  } catch (error) {
    console.error(error);

    status.textContent = "Could not export PNG.";
  }
});

// ----------------------------------------
// LOAD IMAGE
// ----------------------------------------

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.crossOrigin = "anonymous";

    image.onload = () => resolve(image);

    image.onerror = () => reject(new Error(`Could not load image: ${src}`));

    image.src = src;
  });
}

// ----------------------------------------
// DRAW COVER IMAGE
// ----------------------------------------

function drawCoverImage(ctx, image, x, y, width, height) {
  const imageRatio = image.width / image.height;

  const canvasRatio = width / height;

  let sourceWidth;
  let sourceHeight;
  let sourceX;
  let sourceY;

  if (imageRatio > canvasRatio) {
    sourceHeight = image.height;

    sourceWidth = image.height * canvasRatio;

    sourceX = (image.width - sourceWidth) / 2;

    sourceY = 0;
  } else {
    sourceWidth = image.width;

    sourceHeight = image.width / canvasRatio;

    sourceX = 0;

    sourceY = (image.height - sourceHeight) / 2;
  }

  ctx.drawImage(
    image,

    sourceX,
    sourceY,
    sourceWidth,
    sourceHeight,

    x,
    y,
    width,
    height,
  );
}

// ----------------------------------------
// DRAW SIMPLE TEXT
// ----------------------------------------

function drawText(ctx, text, x, y) {
  ctx.fillText(text, x, y);
}

function drawPreviewText(ctx, element, canvasRect, scale) {
  const rect = element.getBoundingClientRect();
  const styles = getComputedStyle(element);
  const fontSize = parseFloat(styles.fontSize) * scale;
  const lineHeight = getLineHeight(styles.lineHeight, styles.fontSize) * scale;
  const x = (rect.left - canvasRect.left) * scale;
  const y = (rect.top - canvasRect.top) * scale + fontSize;
  const maxWidth = rect.width * scale;

  ctx.fillStyle = styles.color;
  ctx.font = `${styles.fontWeight} ${fontSize}px ${styles.fontFamily}`;
  drawWrappedText(ctx, element.textContent, x, y, maxWidth, lineHeight);
}

function getLineHeight(lineHeight, fontSize) {
  return lineHeight === "normal"
    ? parseFloat(fontSize) * 1.2
    : parseFloat(lineHeight);
}

// ----------------------------------------
// DRAW WRAPPED TEXT
// ----------------------------------------

function drawWrappedText(ctx, text, x, startY, maxWidth, lineHeight) {
  const words = text.split(" ");

  let line = "";

  let y = startY;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + " ";

    const metrics = ctx.measureText(testLine);

    if (metrics.width > maxWidth && line !== "") {
      ctx.fillText(line, x, y);

      line = words[i] + " ";

      y += lineHeight;
    } else {
      line = testLine;
    }
  }

  if (line !== "") {
    ctx.fillText(line, x, y);

    y += lineHeight;
  }

  return y;
}

// ----------------------------------------
// START
// ----------------------------------------

loadPosts();

// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

(function() {
  const data = [
    'https://i.pinimg.com/236x/41/ce/15/41ce155bc1c19d064c253b74d04908bf.jpg',
    'https://images.unsplash.com/photo-1459478309853-2c33a60058e7aa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
    'https://i.pinimg.com/236x/68/ab/6b/68ab6b7d575fc5b9869681232e1f47a5.jpg',
    'https://i.pinimg.com/236x/fd/05/fc/fd05fcd7dce16a485272063fc0078dcd.jpg',
    'https://i.pinimg.com/236x/a5/85/22/a58522d9d5055b4b7769940c4032ff32.jpg',
    'https://i.pinimg.com/236x/b7/51/c5/b751c5cdcc6b90572a7c773a29e66e95.jpg',
    'https://i.pinimg.com/236x/fc/d6/ef/fcd6ef4a1d575c121285b36a76f3881a.jpg',
    'https://i.pinimg.com/236x/08/56/e2/0856e276665df409c6b60b2938700435.jpg',
    'https://i.pinimg.com/236x/3a/97/d5/3a97d57124d629b9529ae2a229742ba8.jpg',
    'https://i.pinimg.com/236x/b3/f4/9b/b3f49bafe13a98db4117e23d00c4634c.jpg',
    'https://i.pinimg.com/236x/18/24/f3/1824f3a52f70485b7f7d964aad40b731.jpg',
    'https://i.pinimg.com/236x/93/c6/b4/93c6b40ae0366585ee9cfe9ccb27bb0d.jpg',
    'https://i.pinimg.com/236x/13/c1/53/13c153a069845bbd33d3bd11f563eea9.jpg',
    'https://i.pinimg.com/236x/25/b8/67/25b86791f51a47293887c566c6efbbb7.jpg'
  ];
  let lastIndexLoaded = -1;
  const heights = [0, 0, 0];
  const padding = 8;
  const containerWidth = window.innerWidth / 3;
  const width = window.innerWidth / 3 - padding;
  let isProcessing = false;
  let q = [];

  function writeToDocument(img) {
    let [x, y] = calculatePosition(img);
    img.style.transform = `translate(${x}px, ${y}px)`;
    if (!img.getAttribute('error')) img.style.visibility = 'visible';
  }

  function process() {
    while (q.length > 0) {
      let id = q[0];
      let eleImg = document.getElementById(id);
      let isLoaded = eleImg.getAttribute('loaded');

      if (!isLoaded) return;

      q.shift();
      writeToDocument(eleImg);
    }
  }

  function loadImages() {
    const eleDiv = document.createElement('div');
    eleDiv.id = 'container';
    eleDiv.style.position = 'relative';

    data.forEach((item, index) => {
      const eleImg = document.createElement('img');
      const id = `img_${index}`;
      eleImg.src = item;
      eleImg.id = id;
      q.push(id);

      eleImg.onload = function() {
        eleImg.height = eleImg.clientHeight;
        eleImg.setAttribute('loaded', true);
        eleImg.width = width;
        eleImg.style.position = 'absolute';
        eleImg.style.visibility = 'hidden';

        let id = eleImg.id;
        if (id == q[0]) process();
      };

      eleImg.onerror = function() {
        console.log('on error called');
        eleImg.setAttribute('loaded', true);
        eleImg.setAttribute('error', true);
        eleImg.style.visibility = 'hidden';
        let id = eleImg.id;
        if (id == q[0]) process();
      };
      eleDiv.appendChild(eleImg);
    });

    app.appendChild(eleDiv);
  }

  function calculatePosition(img) {
    const { minHeight, minHeightIndex } = getMinHeight();
    const y = minHeight;
    const x = (minHeightIndex % 3) * containerWidth;

    updateHeight(minHeightIndex, img.height + 16);
    return [x, y];
  }

  function getMinHeight() {
    let minHeightIndex = 0,
      minHeight = heights[0];
    for (let i = 1; i < heights.length; i++) {
      if (heights[i] < minHeight) {
        minHeight = heights[i];
        minHeightIndex = i;
      }
    }
    return { minHeight, minHeightIndex };
  }

  function updateHeight(index, height) {
    heights[index] += height;
  }

  function init() {
    loadImages();
  }

  init();
})();

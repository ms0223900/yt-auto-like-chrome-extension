const WAIT_FOR_ELEMENTS_LOADING_TIMEOUT = 3000;

(() => {
  let prevUrl = location.href;
  const observer = new MutationObserver(() => {
    console.log('document elements changed')
    const currentUrl = location.href;
    if (prevUrl !== currentUrl) {
      window.dispatchEvent(new CustomEvent('locationchange', {
        detail: {
          currentUrl,
        },
      }))
      prevUrl = currentUrl;
    }
  }).observe(document, {
    subtree: true,
    childList: true,
  })
})();

function findYTLikeButton() {
  const menuContainer = document.getElementById('menu-container');
  const buttonWrapper = menuContainer.getElementsByTagName('ytd-toggle-button-renderer')[0];

  if (!buttonWrapper) return null;
  const button = buttonWrapper.querySelector('button#button');
  return button;
}

function checkIsLiked(buttonEl) {
  const pressed = buttonEl.ariaPressed;
  if (pressed === 'true') return true;
  return false;
}

function main() {
  const likeButtonEl = findYTLikeButton();
  if (!likeButtonEl) return;

  const isLiked = checkIsLiked(likeButtonEl);
  if (isLiked) return;

  likeButtonEl.click();
  console.log(likeButtonEl);
  console.log('Auto liked :)')
}

const timeoutLikeVideo = () => {
  setTimeout(() => {
    main();
  }, WAIT_FOR_ELEMENTS_LOADING_TIMEOUT)
}

window.addEventListener('locationchange', timeoutLikeVideo)
window.addEventListener('popstate', timeoutLikeVideo)
window.addEventListener('load', timeoutLikeVideo)
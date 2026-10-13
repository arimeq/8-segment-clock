/**
 * Clock in a small always-on-top window, via the Document Picture-in-Picture API.
 * Desktop Chromium only; elsewhere `pipSupported` is false.
 */
export const pipSupported = 'documentPictureInPicture' in window;

let pipWindow = null;

export const isPipOpen = () => pipWindow !== null;

export async function openPip(clockEl, onMove = () => {}) {
  if (pipWindow) {
    pipWindow.close();
    return;
  }
  pipWindow = await documentPictureInPicture.requestWindow({ width: 360, height: 120 });
  const pipDoc = pipWindow.document;

  const stylesheet = pipDoc.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = new URL('clock.css', document.baseURI).href;
  pipDoc.head.appendChild(stylesheet);
  pipDoc.title = 'Clock';

  // the custom color lives in a CSS variable on <html>
  const copyRootStyle = () => {
    pipDoc.documentElement.style.cssText = document.documentElement.style.cssText;
  };
  copyRootStyle();
  const styleObserver = new MutationObserver(copyRootStyle);
  styleObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });

  const fit = () => {
    clockEl.style.zoom = '';
    const { width, height } = clockEl.getBoundingClientRect();
    const scale = Math.min(pipWindow.innerWidth / width, pipWindow.innerHeight / height) * 0.9;
    clockEl.style.zoom = scale;
  };

  const placeholder = document.createComment('clock is in picture-in-picture');
  clockEl.before(placeholder);
  pipDoc.body.appendChild(clockEl);
  fit();
  pipWindow.addEventListener('resize', fit);
  onMove();

  pipWindow.addEventListener('pagehide', () => {
    styleObserver.disconnect();
    clockEl.style.zoom = '';
    placeholder.replaceWith(clockEl);
    pipWindow = null;
    onMove();
  }, { once: true });
}

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "/*!\n * FilePondPluginImagePreview 4.6.12\n * Licensed under MIT, https://opensource.org/licenses/MIT/\n * Please visit https://pqina.nl/filepond/ for details.\n */\n\n/* eslint-disable */\n.filepond--image-preview-markup {\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n.filepond--image-preview-wrapper {\n  z-index: 2;\n}\n.filepond--image-preview-overlay {\n  display: block;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  min-height: 5rem;\n  max-height: 7rem;\n  margin: 0;\n  opacity: 0;\n  z-index: 2;\n  pointer-events: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.filepond--image-preview-overlay svg {\n  width: 100%;\n  height: auto;\n  color: inherit;\n  max-height: inherit;\n}\n.filepond--image-preview-overlay-idle {\n  mix-blend-mode: multiply;\n  color: rgba(40, 40, 40, 0.85);\n}\n.filepond--image-preview-overlay-success {\n  mix-blend-mode: normal;\n  color: rgba(54, 151, 99, 1);\n}\n.filepond--image-preview-overlay-failure {\n  mix-blend-mode: normal;\n  color: rgba(196, 78, 71, 1);\n}\n/* disable for Safari as mix-blend-mode causes the overflow:hidden of the parent container to not work */\n@supports (-webkit-marquee-repetition: infinite) and\n  ((-o-object-fit: fill) or (object-fit: fill)) {\n  .filepond--image-preview-overlay-idle {\n    mix-blend-mode: normal;\n  }\n}\n.filepond--image-preview-wrapper {\n  /* no interaction */\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n\n  /* have preview fill up all available space */\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  height: 100%;\n  margin: 0;\n\n  /* radius is .05em less to prevent the panel background color from shining through */\n  border-radius: 0.45em;\n  overflow: hidden;\n\n  /* this seems to prevent Chrome from redrawing this layer constantly */\n  background: rgba(0, 0, 0, 0.01);\n}\n.filepond--image-preview {\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 1;\n  display: flex; /* this aligns the graphic vertically if the panel is higher than the image */\n  align-items: center;\n  height: 100%;\n  width: 100%;\n  pointer-events: none;\n  background: #222;\n\n  /* will be animated */\n  will-change: transform, opacity;\n}\n.filepond--image-clip {\n  position: relative;\n  overflow: hidden;\n  margin: 0 auto;\n\n  /* transparency indicator (currently only supports grid or basic color) */\n}\n.filepond--image-clip[data-transparency-indicator='grid'] img,\n.filepond--image-clip[data-transparency-indicator='grid'] canvas {\n  background-color: #fff;\n  background-image: url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' fill='%23eee'%3E%3Cpath d='M0 0 H50 V50 H0'/%3E%3Cpath d='M50 50 H100 V100 H50'/%3E%3C/svg%3E\");\n  background-size: 1.25em 1.25em;\n}\n.filepond--image-bitmap,\n.filepond--image-vector {\n  position: absolute;\n  left: 0;\n  top: 0;\n  will-change: transform;\n}\n.filepond--root[data-style-panel-layout~='integrated']\n  .filepond--image-preview-wrapper {\n  border-radius: 0;\n}\n.filepond--root[data-style-panel-layout~='integrated']\n  .filepond--image-preview {\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.filepond--root[data-style-panel-layout~='circle']\n  .filepond--image-preview-wrapper {\n  border-radius: 99999rem;\n}\n.filepond--root[data-style-panel-layout~='circle']\n  .filepond--image-preview-overlay {\n  top: auto;\n  bottom: 0;\n  -webkit-transform: scaleY(-1);\n  transform: scaleY(-1);\n}\n.filepond--root[data-style-panel-layout~='circle']\n  .filepond--file\n  .filepond--file-action-button[data-align*='bottom']:not([data-align*='center']) {\n  margin-bottom: 0.325em;\n}\n.filepond--root[data-style-panel-layout~='circle']\n  .filepond--file\n  [data-align*='left'] {\n  left: calc(50% - 3em);\n}\n.filepond--root[data-style-panel-layout~='circle']\n  .filepond--file\n  [data-align*='right'] {\n  right: calc(50% - 3em);\n}\n.filepond--root[data-style-panel-layout~='circle']\n  .filepond--progress-indicator[data-align*='bottom'][data-align*='left'],\n.filepond--root[data-style-panel-layout~='circle']\n  .filepond--progress-indicator[data-align*='bottom'][data-align*='right'] {\n  margin-bottom: calc(0.325em + 0.1875em);\n}\n.filepond--root[data-style-panel-layout~='circle']\n  .filepond--progress-indicator[data-align*='bottom'][data-align*='center'] {\n  margin-top: 0;\n  margin-bottom: 0.1875em;\n  margin-left: 0.1875em;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}
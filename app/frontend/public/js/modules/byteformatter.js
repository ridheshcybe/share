const FORMATS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

export const formatBytes = (bytes) => {
  let i = 0;

  while (1023 < bytes) {
    bytes /= 1024;
    ++i;
  }

  return (i ? bytes.toFixed(2) : bytes) + ' ' + FORMATS[i];
};

export default formatBytes;
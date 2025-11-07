import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface ZoomImageProps {
  src: string;
  alt?: string;
  style?: React.CSSProperties;
}

const ZoomImage: React.FC<ZoomImageProps> = ({ src, alt = '', style }) => {
  return (
    <Zoom zoomMargin={24}>
      <img src={src} alt={alt} style={style} />
    </Zoom>
  );
};

export default ZoomImage;

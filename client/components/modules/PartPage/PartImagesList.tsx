import { IPartImagesItemProps } from '@/types/part';
import styles from '@/styles/part/index.module.scss';
import { useUnit } from 'effector-react';
import { $productPart } from '@/context/productPart';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useState } from 'react';
import PartImagesItem from './PartImagesItem';
import PartSlider from './PartSlider';

const PartImagesList = ({ src, callback, alt }: IPartImagesItemProps) => {
  const productPart = useUnit($productPart);
  const isMobile = useMediaQuery(850);
  const images = productPart.images
    ? (JSON.parse(productPart.images) as string[])
    : [];
  const [currentImgSrc, setCurrentImgSrc] = useState('');

  return (
    <div className={styles.part__images}>
      {isMobile ? (
        <PartSlider images={images} />
      ) : (
        <>
          <div className={styles.part__images__main}>
            <img src={currentImgSrc || images[0]} alt={productPart.name} />
          </div>
          <ul className={styles.part__images__list}>
            {images.map((item, index) => (
              <PartImagesItem
                key={index}
                src={item}
                alt={`image-${index + 1}`}
                callback={setCurrentImgSrc}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PartImagesList;

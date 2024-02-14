import { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import styled from 'styled-components';

type SwipableImageContainerProps = {
  imageUrls: string[];
};
export default function SwipableImageContainer({
  imageUrls
}: SwipableImageContainerProps) {
  const [locked, setLocked] = useState(false);
  return (
    <StyledWrapper>
      <Carousel
        dynamicHeight
        infiniteLoop
        useKeyboardArrows
        swipeable={!locked}
        showThumbs={false}
      >
        {imageUrls.map((url: string, i: number) => (
          <div key={i} style={{ height: '100%' }}>
            {/* <img
          onClick={() => {
            onImgClicked(url);
          }}
          src={url}
          style={{
            height: '100%'
          }}
        /> */}
            <TransformWrapper centerOnInit initialScale={1} disabled={!locked}>
              {({}) => (
                <>
                  <button
                    onClick={() => {
                      // resetTransform();
                      setLocked(!locked);
                    }}
                  >
                    gello
                  </button>
                  <TransformComponent
                    wrapperStyle={{
                      width: '100%',
                      height: '100%',
                      alignSelf: 'center'
                    }}
                  >
                    {url && (
                      <img
                        src={url}
                        style={{
                          maxWidth: '100%',
                          height: '100%'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      ></img>
                    )}
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
            {/* {labels.map((label, i) => (
          <span key={i}>{label}, </span>
        ))} */}
          </div>
        ))}
      </Carousel>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  .slider-wrapper {
    height: 100% !important;
  }
  .carousel-root,
  .carousel,
  .slider-wrapper,
  .slide,
  .slider {
    height: 100% !important;
  }
`;

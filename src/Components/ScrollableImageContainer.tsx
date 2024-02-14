import styled from 'styled-components';

type ScrollableImageContainerProps = {
  imageUrls: string[];
  onImgClicked: (url: string) => void;
};

export default function ScrollableImageContainer({
  imageUrls,
  onImgClicked
}: ScrollableImageContainerProps) {
  return (
    <StyledScrollableImageContainer>
      {imageUrls.map((imgUrl, i) => (
        <img key={i} src={imgUrl} onClick={() => onImgClicked(imgUrl)} />
      ))}
    </StyledScrollableImageContainer>
  );
}

const StyledScrollableImageContainer = styled.div`
  width: 100%;
  max-height: 100%;

  overflow: scroll;
  overscroll-behavior: contain;
  text-align: center;
  img {
    max-width: 100%;
  }
`;

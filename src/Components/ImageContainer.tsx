import ScrollableImageContainer from './ScrollableImageContainer';

type ImageContainerProps = {
  images: { url: string; labels: string[] }[];
  onImgClicked: (url: string) => void;
};
export default function ImageContainer({
  images,
  onImgClicked
}: ImageContainerProps) {
  return (
    <ScrollableImageContainer
      imageUrls={images.map((image) => image.url)}
      onImgClicked={onImgClicked}
    ></ScrollableImageContainer>
  );
}

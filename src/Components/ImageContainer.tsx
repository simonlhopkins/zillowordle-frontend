type ImageContainerProps = {
  images: { url: string; labels: string[] }[];
  onImgClicked: (url: string) => void;
};
export default function ImageContainer({
  images,
  onImgClicked
}: ImageContainerProps) {
  return (
    <>
      {images.map(({ url, labels }, i: number) => (
        <div key={i}>
          <img
            onClick={() => {
              onImgClicked(url);
            }}
            src={url}
          />
          {labels.map((label, i) => (
            <span key={i}>{label}, </span>
          ))}
        </div>
      ))}
    </>
  );
}

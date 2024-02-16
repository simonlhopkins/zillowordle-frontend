import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Fab, FabProps, styled } from '@mui/material';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
type FullScreenImageProps = {
  url: string;
  onClose: () => void;
};

export default function FullScreenImage({
  url,
  onClose
}: FullScreenImageProps) {
  return (
    <StyledFullScreenImage>
      <div
        style={{
          position: 'relative',
          height: '100%',
          width: '100%'
        }}
      >
        <StyledFab onClick={onClose} color="primary" aria-label="add">
          <ArrowBackIosNewIcon />
        </StyledFab>
        <TransformWrapper centerOnInit initialScale={1}>
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
                  maxWidth: '100%'
                }}
                onClick={(e) => e.stopPropagation()}
              ></img>
            )}
          </TransformComponent>
        </TransformWrapper>
      </div>
    </StyledFullScreenImage>
  );
}

const StyledFullScreenImage = styled('div')({
  position: 'absolute',
  backgroundImage:
    "url('https://imgflip.com/s/meme/Grandma-Finds-The-Internet.jpg')",
  backgroundSize: '30%',
  alignContent: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  zIndex: '9999',
  animation: 'fadeIn 5s;'
});

const StyledFab = styled(Fab)<FabProps>({
  position: 'absolute',
  margin: '1rem'
});

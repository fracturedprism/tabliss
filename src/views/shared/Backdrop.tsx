import React, { FC, HTMLAttributes } from 'react';

import { useSelector } from '../../store';

type Props = HTMLAttributes<HTMLDivElement>;

const Backdrop: FC<Props> = ({ children, style = {}, ...rest }) => {
  const background = useSelector(state =>
    state.data.backgrounds.find(plugin => plugin.active),
  );

  if (!background) {
    return null;
  }

  const {
    display: { blur, luminosity },
  } = background;

  if (blur) {
    style['filter'] = `blur(${blur}px)`;
    style['transform'] = `scale(${blur / 500 + 1})`;
  }

  if (luminosity) {
    style['opacity'] = 1 - Math.abs(luminosity);
  }

  return (
    <div
      className="fullscreen"
      style={{ backgroundColor: luminosity > 0 ? 'white' : 'black' }}
    >
      <div style={style} {...rest}>
        {children}
      </div>
    </div>
  );
};

export default Backdrop;
import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { useLocation } from 'react-router-dom';
import { Button, CopiedMSG } from './Contructors';
import { shareIcon } from '../images';

export default function ShareButton() {
  const { pathname } = useLocation();
  const [copied, setState] = useState(false);
  const treeSecond = 3000;
  return (
    <div>
      { copied && (<CopiedMSG />)}
      <Button
        testid="share-btn"
        icon={ shareIcon }
        func={ () => {
          copy(pathname);
          setState(true);
          setTimeout(() => {
            setState(false);
          }, treeSecond);
        } }
      />
    </div>
  );
}

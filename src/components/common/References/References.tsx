import React from 'react';
import * as S from './References.styles';
//import { FacebookOutlined, GithubOutlined, LinkedinOutlined, TwitterOutlined } from '@ant-design/icons';

export const References: React.FC = () => {
  return (
    <S.ReferencesWrapper>
      <S.Text>
        Made by{' '}
        <a href="https://google.com" target="_blank" rel="noreferrer">
          XYZ{' '}
        </a>
        in 2023 &copy;
      </S.Text>
    
    {/*
      <S.Icons>
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          <GithubOutlined />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
          <TwitterOutlined />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <FacebookOutlined />
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
          <LinkedinOutlined />
        </a>
      </S.Icons>
  */}

    </S.ReferencesWrapper>
  );
};

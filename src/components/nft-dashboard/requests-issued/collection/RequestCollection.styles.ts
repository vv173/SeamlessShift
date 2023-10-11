import styled from 'styled-components';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { NFTCard } from '@app/components/nft-dashboard/common/NFTCard/NFTCard';
import { FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';


export const NftCollectionInfo = styled.div`
  position: relative;
  padding: 2rem 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:not(:last-of-type) {
    margin-bottom: 0.1rem;
  }
`;

export const Title = styled(BaseTypography.Title)`
  transition: all 0.5s ease;
  &.ant-typography {
    margin-bottom: 0;
    font-size: ${FONT_SIZE.md};
  }
`;

export const Text = styled(BaseTypography.Text)`
  transition: all 0.5s ease;
  font-size: ${FONT_SIZE.xs};
  font-weight: ${FONT_WEIGHT.semibold};
`;

export const BidButton = styled(BaseButton)`
  transition: all 0.5s ease;
  position: relative;
  left: 50%;
  margin-top: 1.5rem; 
  transform: translateX(-50%);
  color: var(--text-secondary-color);
  border-color: var(--text-secondary-color);
  font-size: ${FONT_SIZE.xs};
`;

export const Card = styled(NFTCard)`
  overflow: hidden;
  position: relative;
  &:hover {
    ${Title}, ${Text} {
      color: var(--text-secondary-color);
    }

    ${BidButton} {
      transform: translate(-50%, -25%);
      position: relative;
    }
  }
`;

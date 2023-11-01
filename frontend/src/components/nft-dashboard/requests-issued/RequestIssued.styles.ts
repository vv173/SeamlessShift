import styled from 'styled-components';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BREAKPOINTS } from '@app/styles/themes/constants';

export const SectionWrapper = styled.div`
  .slick-slide > div {
    display: flex;
  }

  .slick-list {
    padding-top: 40px !important;
    padding-bottom: 40px !important;
    margin-top: -40px;
    margin-bottom: 40px;
  }

  @media only screen and (max-width: ${BREAKPOINTS.md - 0.02}px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1.25rem;
    margin-bottom: 1.5rem;
  }
`;

export const ViewAllWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CardWrapper = styled.div`
  margin: 0 0.625rem;
`;

export const ArrowBtn = styled(BaseButton)`
  color: var(--text-nft-light-color);
`;

// Przykład użycia fragmentów w komponencie SectionWrapper
export const FragmentWrapper = styled.div`
  & > * {
    margin-bottom: 1.5rem; /* Dodaj margines między elementami */
  }
`;

// Przykład użycia <React.Fragment> w komponencie SectionWrapper
export const ReactFragmentWrapper = styled.div`
  ${props => props.theme.breakpoints.md} {
    & > * {
      margin-bottom: 1.5rem; /* Dodaj margines między elementami */
    }
  }
`;

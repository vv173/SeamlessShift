import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { BaseCarousel } from '@app/components/common/BaseCarousel/Carousel';
import { ViewAll } from '@app/components/nft-dashboard/common/ViewAll/ViewAll';
import { NFTCardHeader } from '@app/components/nft-dashboard/common/NFTCardHeader/NFTCardHeader';
import { RequestCollection } from '@app/components/nft-dashboard/requests-issued/collection/RequestCollection';
import { useResponsive } from '@app/hooks/useResponsive';
import { getRequestsIssued, RequestsData } from '@app/api/requestsIssued.api'; // Zmieniono na RequestsData
import * as S from './RequestIssued.styles';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';

export const RequestIssued: React.FC = () => {
  const [requests, setRequests] = useState<RequestsData[]>([]); // Zmieniono na RequestsData

  const { mobileOnly, isTablet: isTabletOrHigher } = useResponsive();

  useEffect(() => {
    getRequestsIssued().then((res) => setRequests(res)); // Zmieniono na getRequestsIssued
  }, []);

  const requestList = useMemo(() => {
    return {
      mobile: requests.map((item, index) => <RequestCollection key={index} {...item} />).slice(0, 3),
      tablet: requests.map((item, index) => (
        <div key={index}>
          <S.CardWrapper>
            <RequestCollection {...item} />
          </S.CardWrapper>
        </div>
      )),
    };
  }, [requests]);

  const sliderRef = useRef<Slider>(null);

  return (
    <>
      <NFTCardHeader title='Current requests'>
        {isTabletOrHigher && (
          <BaseRow align="middle">
            <BaseCol>
              <ViewAll bordered={false} />
            </BaseCol>

            <BaseCol>
              <S.ArrowBtn type="text" size="small" onClick={() => sliderRef.current && sliderRef.current.slickPrev()}>
                <LeftOutlined />
              </S.ArrowBtn>
            </BaseCol>

            <BaseCol>
              <S.ArrowBtn type="text" size="small" onClick={() => sliderRef.current && sliderRef.current.slickNext()}>
                <RightOutlined />
              </S.ArrowBtn>
            </BaseCol>
          </BaseRow>
        )}
      </NFTCardHeader>

      <S.SectionWrapper>
        {mobileOnly && requestList.mobile} {/* Zmieniono na requestList.mobile */}

        {isTabletOrHigher && requests.length > 0 && (
          <BaseCarousel
            ref={sliderRef}
            slidesToShow={3}
            responsive={[
              {
                breakpoint: 1900,
                settings: {
                  slidesToShow: 2,
                },
              },
            ]}
          >
            {requestList.tablet} {/* Zmieniono na requestList.tablet */}
          </BaseCarousel>
        )}
      </S.SectionWrapper>

      {mobileOnly && (
        <S.ViewAllWrapper>
          <ViewAll />
        </S.ViewAllWrapper>
      )}
    </>
  );
};

import React from "react";
import numberFormat from "../utils/number-format";
import classNames from "classnames";

const HotSignalInfo = ({ hotSignalTitle }) => {
  if (!hotSignalTitle) return null;
  return (
    <span className='box__itemcard-best-tag'>
      <span className='text__best-tag'>{hotSignalTitle}</span>
    </span>
  );
};

const ItemCardTitle = ({
  itemName,
  isLmoOfficialSeller,
  sdBrandName,
  isFashionSquareSeller,
}) => {
  return (
    <span className='box__itemcard-title-area'>
      <span className='text__brand'>
        {isFashionSquareSeller && (
          <span className='box__itemcard-fashion-tag'>
            <img
              className='image'
              src={`//script.gmarket.co.kr/build/mobile/image/single/fashionsquare/component/itemcard/logo_fashionsquare_3x.png`}
              alt='패션스퀘어 상품'
            />
          </span>
        )}
        {sdBrandName && <span className='text'>{sdBrandName}</span>}
        {isLmoOfficialSeller && (
          <span className='box__official-tag'>
            공식
            <span className='for-a11y'>셀러</span>
          </span>
        )}
      </span>
      <span className='text__title' title={itemName}>
        {itemName}{" "}
      </span>
    </span>
  );
};
const PriceInfo = ({ itemPrice }) => {
  return (
    <span className='box__itemcard-price-area'>
      <span className='box__price-seller'>
        <strong className='text__price-seller'>
          {" "}
          {numberFormat(itemPrice)}
        </strong>
        <span className='text__unit'>원</span>
      </span>
    </span>
  );
};

const DeliveryInfo = ({ deliveryText }) => {
  if (!deliveryText) return null;
  return (
    <div className='box__itemcard-delivery'>
      <span className='text__delivery'>{deliveryText}</span>
    </div>
  );
};

const ReviewInfo = ({ reviewPoint, buyCount }) => {
  const { starPoint = 0, reviewCount = 0 } = reviewPoint || {};
  const hasStarPoint = starPoint > 0;
  const hasReviewCount = reviewCount > 0;
  const hasBuyCount = buyCount > 0;

  if (!hasStarPoint && !hasReviewCount && !hasBuyCount) return null;

  return (
    <span className='box__itemcard-info-score'>
      {(hasStarPoint || hasReviewCount) && (
        <span className='box__score-awards'>
          {hasStarPoint && (
            <>
              <span className='for-a11y'>평점</span>
              <span className='text__score'>{starPoint}</span>
            </>
          )}
          {hasReviewCount && (
            <>
              <span className='for-a11y'>후기</span>
              <span className='text__num'>({numberFormat(reviewCount)})</span>
              <span className='for-a11y'>건</span>
            </>
          )}
        </span>
      )}
      {hasBuyCount && (
        <span className='box__score-buycnt'>
          <span className='text'>구매 {numberFormat(buyCount)}</span>
          <span className='for-a11y'>건</span>
        </span>
      )}
    </span>
  );
};

const ItemCardLmo = ({ lmos }) => {
  if (!lmos) return null;
  return (
    <span className='box__itemcard-benefit-tag'>
      {lmos.map((lmo, i) => (
        <span
          key={i}
          className={classNames("box__tag", {
            "box__tag-coupon": lmo?.lmoType === "COUPON",
            "box__tag-card": lmo?.lmoType === "EXTRA_DISCOUNT",
            "box__tag-gift": ["FREE_GIFT", "ONE_PLUS_ONE"].includes(
              lmo?.lmoType
            ),
          })}
        >
          <span className='box__inner'>{lmo?.lmoString}</span>
        </span>
      ))}
    </span>
  );
};

const ItemCardInfo = ({
  id,
  itemUrl,
  sdBrandName,
  isLmoOfficialSeller,
  isFashionSquareSeller,
  hotSignalTitle,
  itemName,
  itemPrice,
  deliveryText,
  buyCount,
  reviewPoint,
  lmos,
}) => {
  return (
    <a href={itemUrl} className='link__itemcard-info'>
      <HotSignalInfo hotSignalTitle={hotSignalTitle} />
      <ItemCardTitle
        itemName={itemName}
        isFashionSquareSeller={isFashionSquareSeller}
        isLmoOfficialSeller={isLmoOfficialSeller}
        sdBrandName={sdBrandName}
      />
      <PriceInfo itemPrice={itemPrice} />
      <DeliveryInfo deliveryText={deliveryText} />
      <ReviewInfo reviewPoint={reviewPoint} buyCount={buyCount} />
      <ItemCardLmo lmos={lmos} />
    </a>
  );
};

export default ItemCardInfo;

import React from "react";

const MenuCard = ({
  heading,
  content,
  content2,
  bgColor,
  shadowColor,
  hoverShadowColor,
}) => {
  return (
    <div
      className={`animate m-4 rounded-lg ${bgColor} ${shadowColor} ${hoverShadowColor} p-4 shadow-lg hover:shadow-xl md:m-0 md:w-1/2 lg:w-2/6`}
    >
      <h4 className="mb-5 text-xl font-bold">{heading}</h4>
      <p>
        {content} <br />
        {content2 && (
          <>
            <br />
            <i>{content2}</i>
          </>
        )}
      </p>
    </div>
  );
};

export default MenuCard;

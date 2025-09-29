import style from './ingredient-mini.module.css';

export const IngredientMini = ({
  ingredient,
  orderIngredients,
  index,
}: {
  ingredient: {
    _id: string;
    name: string;
    image_mobile: string;
  };
  orderIngredients: { _id: string }[];
  index?: number;
}): React.JSX.Element => {
  // const maxVisible = 6;
  // const isHidden = typeof index === 'number' && index >= maxVisible;
  // const hiddenCount = orderIngredients.length - maxVisible;
  {
    console.log(index);
  }
  return (
    <div
      key={ingredient._id}
      className={`${style.image_wrapper}`}
      style={{
        zIndex: orderIngredients.length - (typeof index === 'number' ? index : 0),
      }}
    >
      <div className={`${style.image_overlay}`}>
        <img
          src={ingredient.image_mobile}
          alt={ingredient.name}
          className={`${style.image}`}
        />
        {orderIngredients.length > 5
          ? index === 5 && (
              <div className={`${style.image_overlay_text}`}>
                <span className="text text_type_digits-default">
                  +{orderIngredients.length - 4}
                </span>
              </div>
            )
          : null}
      </div>
    </div>
  );
};

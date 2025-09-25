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
        {orderIngredients.length > 6 && typeof index === 'number' && index > 5 ? (
          <div className={`${style.image_overlay_text}`}>
            <span className="text text_type_digits-default">
              +{orderIngredients.length - 5}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

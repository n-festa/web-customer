import { IngredientType } from "types";

const Ingredient = ({ name }: IngredientType) => {
    return <span className="ms-1">{name} ,</span>;
};

export default Ingredient;

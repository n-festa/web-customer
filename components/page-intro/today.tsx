import React from "react";
import MenuItem from "../../components/item/index";
import useSwr from "swr";
import { fetcher } from "../../utils/fetcher";
import { ProductTypeList } from "types";

const Today = () => {
    const { data } = useSwr("/api/products", fetcher);

    console.log(data);
    if (!data) return <div>Loading</div>;

    return (
        <section className="daily-food-section d-flex flex-column">
            <div className="container d-flex flex-column align-items-center gap-5">
                <b className="title">Món ngon hôm nay</b>
                <div className="food-cards d-flex justify-content-between">
                    {data.map((item: ProductTypeList) => (
                        <MenuItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            images={item.images}
                            merchart={item.merchart}
                            cook_method={item.cook_method}
                            currentPrice={item.currentPrice}
                            price={item.price}
                            ingredient={item.ingredient}
                            kcal={item.kcal}
                            time={item.time}
                            distance={item.distance}
                            ratings={item.ratings}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Today;

import "./Promotions.css";
import { promotions } from "../../db/promotions";
import { useAuth } from "../../hooks/auth.hook";
import { PromotionItem } from "../../components/Promotion/PromotionItem/PromotionItem";

export const Promotions = () => {
    const { user } = useAuth();

    const userPromotions = promotions.filter((promotion) =>
        user?.promotions.includes(promotion.id)
    );

    return (
        <div className="promotions">
            <h1>Promotions</h1>
            <ul>
                {userPromotions.map((promotion) => (
                    <PromotionItem key={promotion.id} promotion={promotion} />
                ))}
            </ul>
        </div>
    );
};

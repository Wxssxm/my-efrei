import { PromotionInterface } from "../../../interfaces/promotion.interface";
import "./PromotionItem.css";
import { users } from "../../../db/users";

export const PromotionItem = ({
    promotion,
}: {
    promotion: PromotionInterface;
}) => {
    const students = users.filter((user) =>
        user.promotions.includes(promotion.id)
    );

    return (
        <div className="promotion-item">
            <h2>{promotion.name}</h2>
            <div className="nb-student">Nombre d'élèves :{students.length}</div>
        </div>
    );
};

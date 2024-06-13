import "./Promotions.css";
import { promotions } from "../../db/promotions";
import { useAuth } from "../../hooks/auth.hook";
import { users } from "../../db/users";
import { LineItem } from "../../components/LineItem/LineItem";

export const Promotions = () => {
    const { user } = useAuth();

    const userPromotions = promotions.filter((promotion) =>
        user?.promotions.includes(promotion.id)
    );

    return (
        <div className="promotions">
            <h1>Promotions</h1>
            <ul>
                {userPromotions.map((promotion) => {
                    let nbStudent = users.filter((user) =>
                        user.promotions.includes(promotion.id)
                    ).length;

                    return (
                        <li key={promotion.id}>
                            <LineItem
                                title={promotion.name}
                                subtitle={`${nbStudent} étudiant(s)`}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

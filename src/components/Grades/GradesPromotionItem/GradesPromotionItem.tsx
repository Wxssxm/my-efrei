import { PromotionInterface } from "../../../interfaces/promotion.interface";
import "./GradesPromotionItem.css";
import { users } from "../../../db/users";
import { Link } from "react-router-dom";

export const GradesPromotionItem = ({
    promotion,
    course,
}: {
    promotion: PromotionInterface;
    course: string;
}) => {
    const usersPromotion = users.filter((user) =>
        user.promotions.includes(promotion.id)
    );

    const grades = usersPromotion
        .map(
            (user) =>
                user.grades?.find((grade) => grade.course === course)?.grade
        )
        .filter((grade) => grade !== undefined) as number[];

    const average =
        grades.reduce((acc, grade) => acc + grade, 0) / grades.length;

    return (
        <div className="grades-promotion-item">
            <div>
                <h3>{promotion.name}</h3>
                <p>
                    {grades.length} élève{grades.length > 1 ? "s" : ""} dans
                    cette promotion
                </p>
            </div>
            <div>
                <h3>Moyenne: {average}</h3>
            </div>
            <div className="actions">
                <ul>
                    <li>
                        <Link to={"/grades/" + promotion.id}>Details</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

import { RoleEnum } from "../../enums/role.enum";
import { useAuth } from "../../hooks/auth.hook";
import "./Grades.css";
import { promotions } from "../../db/promotions";
import { Navigate } from "react-router-dom";
import { LineItem } from "../../components/LineItem/LineItem";
export const Grades = () => {
    const { user } = useAuth();
    if (user?.role === RoleEnum.STUDENT) {
        return (
            <div className="grades">
                <h1>Notes</h1>
                <ul>
                    {user.grades!.map((grade, index) => (
                        <li key={index}>
                            <LineItem
                                title={grade.course}
                                subtitle={grade.grade.toString()}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    if (user?.role === RoleEnum.TEACHER) {
        const teacherPromotions = promotions.filter((promotion) =>
            user.promotions.includes(promotion.id)
        );

        return (
            <div className="grades">
                <h1>Promotions</h1>
                <ul>
                    {teacherPromotions.map((promotion, index) => (
                        <li key={index}>
                            <LineItem
                                title={promotion.name}
                                links={[
                                    {
                                        href: "/grades/" + promotion.id,
                                        text: "Voir les notes",
                                    },
                                ]}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return <Navigate to={"/"} />;
};

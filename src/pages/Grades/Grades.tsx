import { RoleEnum } from "../../enums/role.enum";
import { useAuth } from "../../hooks/auth.hook";
import "./Grades.css";
import { GradesPromotionItem } from "../../components/Grades/GradesPromotionItem/GradesPromotionItem";
import { promotions } from "../../db/promotions";
import { Navigate } from "react-router-dom";
export const Grades = () => {
    const { user } = useAuth();
    if (user?.role === RoleEnum.STUDENT) {
        return (
            <div className="grades">
                <h1>Notes</h1>
                <ul>
                    {user.grades!.map((grade, index) => (
                        <li key={index}>
                            <span>Matière: {grade.course}</span>
                            <span>Note: {grade.grade}</span>
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
                        <GradesPromotionItem
                            key={index}
                            promotion={promotion}
                            course={user.course!}
                        />
                    ))}
                </ul>
            </div>
        );
    }

    return <Navigate to={"/"} />;
};

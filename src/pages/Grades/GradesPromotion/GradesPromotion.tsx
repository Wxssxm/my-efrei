import "./GradesPromotion.css";
import { users } from "../../../db/users";
import { useAuth } from "../../../hooks/auth.hook";
import { promotions } from "../../../db/promotions";
import { useParams } from "react-router-dom";

export const GradesPromotion = () => {
    let { promotionId } = useParams();
    if (!promotionId) {
        throw Error("Paramètre promotion ID manquant");
    }

    const { user } = useAuth();
    const promotion = promotions.find(
        (promotion) => promotion.id === parseInt(promotionId!)
    );
    const course = user?.course!;

    const students = users.filter(
        (user) =>
            user.grades?.find((grade) => grade.course === course) &&
            user.promotions.includes(parseInt(promotionId!))
    );

    return (
        <div className="grades-promotions">
            <h2>Élèves de la promotion {promotion?.name}</h2>
            {students.map((student) => {
                let grade = student.grades?.find(
                    (grade) => grade.course === course
                )?.grade;
                return (
                    <div key={student.id} className="student-grade">
                        <div className="student-name">
                            {student.firstName + " " + student.lastName}
                        </div>
                        <div className="grade">{grade}</div>
                    </div>
                );
            })}
        </div>
    );
};

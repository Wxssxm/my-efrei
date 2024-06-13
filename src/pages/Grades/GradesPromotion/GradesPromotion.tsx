import "./GradesPromotion.css";
import { users } from "../../../db/users";
import { useAuth } from "../../../hooks/auth.hook";
import { promotions } from "../../../db/promotions";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { UserInterface } from "../../../interfaces/user.interface";
import { LineItem } from "../../../components/LineItem/LineItem";
import { RoleEnum } from "../../../enums/role.enum";

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

    const [students, setStudents] = useState<UserInterface[]>(() => {
        const students = users.filter(
            (user) =>
                user.promotions.includes(parseInt(promotionId!)) &&
                user.role === RoleEnum.STUDENT
        ) as UserInterface[];

        return students;
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let newStudents = students.map((student) =>
            student.id == e.currentTarget.student.value
                ? {
                      ...student,
                      grades: [
                          ...(student.grades ?? []),
                          {
                              course: course,
                              grade: parseInt(e.currentTarget.grade.value),
                          },
                      ],
                  }
                : student
        );

        setStudents(newStudents);
    };

    return (
        <div className="grades-promotions">
            <h2>Élèves de la promotion {promotion?.name}</h2>
            <h3>{course}</h3>
            <form className="add-grade" onSubmit={(e) => handleSubmit(e)}>
                <input name="grade" type="text" placeholder="Note" />
                <select defaultValue={""} name="student">
                    <option disabled value="">
                        Élève sans notes :
                    </option>
                    {students
                        .filter(
                            (student) =>
                                !student.grades?.find(
                                    (grade) => grade.course === course
                                )
                        )
                        .map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.firstName} {student.lastName}
                            </option>
                        ))}
                </select>
                <button>Ajouter</button>
            </form>
            <ul>
                {students.map((student) => {
                    let grade = student.grades?.find(
                        (grade) => grade.course === course
                    )?.grade;
                    if (grade) {
                        return (
                            <li key={student.id}>
                                <LineItem
                                    title={`${student.firstName} ${student.lastName}`}
                                    subtitle={`Note: ${grade}`}
                                />
                            </li>
                        );
                    } else {
                        return (
                            <li key={student.id}>
                                <LineItem
                                    title={`${student.firstName} ${student.lastName}`}
                                    subtitle={`Pas de note`}
                                />
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
};

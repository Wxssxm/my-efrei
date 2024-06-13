import { useAuth } from "../../hooks/auth.hook";
import "./Courses.css";
import { users } from "../../db/users";
import { RoleEnum } from "../../enums/role.enum";
import { LineItem } from "../../components/LineItem/LineItem";

export const Courses = () => {
    const { user } = useAuth();

    const teachers = users.filter(
        (teacher) =>
            teacher.role === RoleEnum.TEACHER &&
            teacher.promotions.includes(user!.promotions[0])
    );

    return (
        <div className="courses">
            <ul>
                {teachers.map((teacher, index) => (
                    <li key={index}>
                        <LineItem
                            title={teacher.course!}
                            subtitle={`${teacher.firstName} ${teacher.lastName}`}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

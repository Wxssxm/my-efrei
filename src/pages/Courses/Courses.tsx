import { useAuth } from "../../hooks/auth.hook";
import "./Courses.css";
import { users } from "../../db/users";
import { RoleEnum } from "../../enums/role.enum";

export const Courses = () => {
    const { user } = useAuth();

    const teachers = users.filter(
        (teacher) =>
            teacher.role === RoleEnum.TEACHER &&
            teacher.promotions.includes(user!.promotions[0])
    );

    return (
        <div className="courses">
            {teachers.map((teacher, index) => (
                <div key={index} className="course">
                    <div className="teacher-name">
                        {teacher.firstName + " " + teacher.lastName}
                    </div>
                    <div className="course-name">{teacher.course}</div>
                </div>
            ))}
        </div>
    );
};

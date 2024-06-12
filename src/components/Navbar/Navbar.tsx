import { Link } from "react-router-dom";
import "./Navbar.css";
import { RoleEnum } from "../../enums/role.enum";
export const Navbar = ({ role }: { role: RoleEnum }) => {
  const linksByRole = [
    {
      role: RoleEnum.STUDENT,
      links: [
        <Link to="/courses">Matières</Link>,
        <Link to="/grades">Notes</Link>,
      ],
    },
    {
      role: RoleEnum.TEACHER,
      links: [
        <Link to="/promotions">Promotions</Link>,
        <Link to="/grades">Notes</Link>,
      ],
    },
  ];

  return (
    <nav>
      <ul>
        <div className="links">
          {linksByRole
            .find((link) => link.role === role)
            ?.links.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
        </div>
        <div className="user-links">
          <li>
            <Link to="/profile">Profil</Link>
          </li>
          <li>
            <Link to="/logout">Déconnexion</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

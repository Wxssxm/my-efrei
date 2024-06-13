import { Link } from "react-router-dom";
import "./LineItem.css";

type LineItemProps = {
    title: string;
    subtitle?: string;
    links?: { href: string; text: string }[];
};

export const LineItem = ({ title, subtitle, links }: LineItemProps) => {
    return (
        <div className="line-item">
            <div>
                <h2>{title}</h2>
                {subtitle && <p>{subtitle}</p>}
            </div>
            {links && (
                <ul>
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link to={link.href}>{link.text}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

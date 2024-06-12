import { useAuth } from "../../hooks/auth.hook";
import "./Profile.css";
import { promotions } from "../../db/promotions";
import { RoleEnum } from "../../enums/role.enum";
export const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="profile">
            <div className="firstname">Prénom: {user?.firstName}</div>
            <div className="lastname">Nom: {user?.lastName}</div>
            {user?.role === RoleEnum.TEACHER && (
                <div className="promotions">
                    <h2>Promotions :</h2>
                    {user?.promotions.map((promotionId) => {
                        let promotionName = promotions.find(
                            (promotion) => promotion.id === promotionId
                        )?.name;

                        return (
                            <div className="promotion">
                                {promotionName ?? "Promotion inconnue"}
                            </div>
                        );
                    })}
                </div>
            )}
            {user?.role === RoleEnum.STUDENT && (
                <div className="promotion">
                    Promotion :
                    {
                        promotions.find(
                            (promotion) => promotion.id === user.promotions[0]
                        )?.name
                    }
                </div>
            )}
        </div>
    );
};
